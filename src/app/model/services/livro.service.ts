import { Injectable } from '@angular/core';
import { Livro } from '../entities/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private lista_livros: Livro[] = [];

  constructor() {
    let livro1 = new Livro("O Senhor dos Anéis", "J. R. R. Tolkien");
    let livro2 = new Livro("O Hobbit", "J. R. R. Tolkien");
    let livro3 = new Livro("O Silmarillion", "J. R. R. Tolkien");
    this.lista_livros.push(livro1);
    this.lista_livros.push(livro2);
    this.lista_livros.push(livro3);
   }

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
