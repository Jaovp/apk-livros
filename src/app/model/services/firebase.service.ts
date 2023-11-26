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

  read(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  create(livro: Livro){
    return this.firestore.collection(this.PATH).add({
      titulo: livro.titulo,
      autor: livro.autor,
      ano: livro.ano,
      genero: livro.genero,
      editora: livro.editora,
      });
  }

  createWithImage(livro: Livro){
    return this.firestore.collection(this.PATH).add({titulo: livro.titulo, autor: livro.autor, ano: livro.ano, genero: livro.genero, editora: livro.editora, downloadURL: livro.downloadURL})
  }

  update(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        genero: livro.genero,
        editora: livro.editora,
      });
  }

  updateWithImage(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({titulo: livro.titulo, autor: livro.autor, ano: livro.ano, genero: livro.genero, editora: livro.editora, downloadURL: livro.downloadURL}) 
  }
  
  delete(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  uploadImage(imagem: any, livro: Livro){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Arquivo não suportado');
      return;
    }
    const path = `images/${livro.titulo}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp => {
          livro.downloadURL = resp;
          if(!livro.id){
            this.createWithImage(livro);
          }else{
            this.updateWithImage(livro, livro.id);
          }
        })
      })
    ).subscribe();
  }
  
}
