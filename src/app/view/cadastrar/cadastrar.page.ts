import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Genero, Livro } from 'src/app/model/entities/Livro';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  titulo!: string;
  autor!: string;
  ano!: number;
  genero!: Genero;
  editora!: string;
  public imagem: any;

  lista_livros: Livro[] = [];

  constructor(private alertController: AlertController, private firebase: FirebaseService, private router: Router) {
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }
  
  cadastrarLivro(){
    if(this.titulo && this.autor && this.ano && this.genero && this.editora){
      let novo: Livro = new Livro(this.titulo, this.autor, this.ano, this.genero, this.editora);
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.presentAlert("Sucesso", "Livro Cadastrado!");
      this.router.navigate(['/home']);
    }else{
      this.presentAlert("Erro", "Preencha todos os campos!");
    }
    
  }
  
  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Meus Livros',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
