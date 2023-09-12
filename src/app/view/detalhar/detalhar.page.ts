import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/model/entities/Livro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  livro!: Livro;
  titulo!: string;
  autor!: string;
  ano!: number;
  genero!: string;
  editora!: string;

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.livro = history.state.livro;
    this.titulo = this.livro.titulo;
    this.autor = this.livro.autor;
    this.ano = this.livro.ano;
    this.genero = this.livro.genero;
    this.editora = this.livro.editora;
    
  }

}
