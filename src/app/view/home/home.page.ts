import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/model/entities/Livro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lista_livros: Livro[] = [];

  
  //this.lista_livros.push(new Livro("O Senhor dos Anéis", "J. R. R. Tolkien", 1954, "Fantasia", "Allen & Unwin"));
  //this.lista_livros.push(new Livro("O Hobbit", "J. R. R. Tolkien", 1937, "Fantasia", "Allen & Unwin"));
  
  constructor(private router: Router, private firebase: FirebaseService) {
    this.firebase.read().subscribe(res => {
      this.lista_livros = res.map( livro => {
        return {
          id: livro.payload.doc.id,
          ...livro.payload.doc.data() as any
        } as Livro;
      })
    })
  };


  cadastrar(){
    this.router.navigate(['/cadastrar']);
  }

  editar(Livro: Livro){
    this.router.navigateByUrl("/detalhar",
    {state: {livro:Livro}});
  }

}
