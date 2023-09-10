import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/model/entities/Livro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lista_livros: Livro[] = [];

  constructor(private router: Router) {
    this.lista_livros.push(new Livro("O Senhor dos Anéis", "J. R. R. Tolkien", 1954, "Fantasia", "Allen & Unwin"));
    this.lista_livros.push(new Livro("O Hobbit", "J. R. R. Tolkien", 1937, "Fantasia", "Allen & Unwin"));
    
  }

  cadastrar(){
    this.router.navigate(['/cadastrar']);
  }

}
