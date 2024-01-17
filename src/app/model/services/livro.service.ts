import { Injectable } from '@angular/core';
import { Livro } from '../entities/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private lista_livros: Livro[] = [];

  constructor() {}

   public obterTodos(): Livro[]{
    return this.lista_livros;
   }

   public obterPorIndice(indice: number): Livro{
    return this.lista_livros[indice];
   }

   public cadastrar(livro: Livro): void{
    this.lista_livros.push(livro);
   }

   public editar(livro: Livro, indice: number): void{
    this.lista_livros[indice] = livro;
   }

   public excluir(indice: number): void{
    this.lista_livros.splice(indice, 1);
   }
}
