import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Livro } from '../entities/Livro';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'livros'


  constructor(private firestore: AngularFirestore) { }

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

  update(livro: Livro, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        genero: livro.genero,
        editora: livro.editora,
      });
  }
  
  delete(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
  
}
