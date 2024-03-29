import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Livro } from '../entities/Livro';
import { finalize } from 'rxjs/operators'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'livros'


  constructor(private firestore: AngularFirestore, private storage : AngularFireStorage) { }

  read(uid: string){
    return this.firestore.collection(this.PATH, ref=> ref.where('uid', '==', uid)).snapshotChanges();
  }

  create(livro: Livro){
    return this.firestore.collection(this.PATH).add({
      titulo: livro.titulo,
      autor: livro.autor,
      ano: livro.ano,
      genero: livro.genero,
      editora: livro.editora,
      uid: livro.uid,
      });
  }

  createWithImage(livro: Livro){
    return this.firestore.collection(this.PATH).add({titulo: livro.titulo, autor: livro.autor, ano: livro.ano, genero: livro.genero, editora: livro.editora, downloadURL: livro.downloadURL, uid: livro.uid,})
  }

  update(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        genero: livro.genero,
        editora: livro.editora,
        uid: livro.uid,
      });
  }

  updateWithImage(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({
      titulo: livro.titulo,
      autor: livro.autor,
      ano: livro.ano, genero: livro.genero,
      editora: livro.editora,
      downloadURL: livro.downloadURL,
      uid: livro.uid,}) 
  }
  
  delete(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  uploadImage(imagem: any, livro: Livro){
    return new Promise((resolve, reject) => {
      const file = imagem.item(0);
      if (file.type.split('/')[0] !== 'image') {
        console.error('Arquivo não suportado');
        reject('Arquivo não suportado');
        return;
      }
  
      const path = `images/${livro.titulo}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          let uploadedFileURL = fileRef.getDownloadURL();
          uploadedFileURL.subscribe(
            resp => {
              livro.downloadURL = resp;
              if (!livro.id) {
                this.createWithImage(livro);
              } else {
                this.updateWithImage(livro, livro.id);
              }
              resolve(resp);
            },
            error => {
              reject(error); 
            }
          );
        })
      ).subscribe();
    });
 }

}
