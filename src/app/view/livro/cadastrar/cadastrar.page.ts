import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import { Genero, Livro } from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
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
  user: any;

  lista_livros: Livro[] = [];

  constructor(private alertController: AlertController, private firebase: FirebaseService, private router: Router, private authService: AuthService, private alert: AlertService) {
    this.user = this.authService.getUserLogged();
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  
  cadastrarLivro(){
    if(this.titulo && this.autor && this.ano && this.genero && this.editora){
      let novo: Livro = new Livro(this.titulo, this.autor, this.ano, this.genero, this.editora);
      novo.uid = this.user.uid;
      this.alert.simpleLoader();
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo).then(() => {
          this.alert.dismissLoader();
        })
        .catch(error => {
          console.error(error);
        });
      }else{
        this.firebase.create(novo).then(() => {
          this.alert.dismissLoader();
        }
        ).catch(error => {
          console.error(error);
        });
      }
      this.router.navigate(['/home']);
      this.alert.presentAlert("Sucesso", "Livro Cadastrado!");
    }else{
      this.alert.presentAlert("Erro", "Preencha todos os campos!");
    }
  }

  ngOnInit() {
  }

}
