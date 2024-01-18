import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import { Genero, Livro } from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
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
  genero!: Genero;
  editora!: string;
  edicao: boolean = true;
  public imagem: any;
  public user: any;

  constructor(private router: Router, private firebaseService: FirebaseService, private alertController: AlertController, private authService : AuthService, private alert : AlertService) {
    this.user = this.authService.getUserLogged();
   }

  habilitarEdicao(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  atualizar(){
      let editar: Livro = new Livro(this.titulo, this.autor, this.ano, this.genero, this.editora);
      editar.uid = this.user.uid;
      editar.id = this.livro.id;
      this.alert.simpleLoader();
      if(this.imagem){
        this.firebaseService.uploadImage(this.imagem, editar);
      }
      editar.downloadURL = this.livro.downloadURL;
      this.firebaseService.update(editar, this.livro.id).then(res => {
      this.alert.dismissLoader();
      this.presentAlert("Sucesso", "Livro Atualizado!");
      })
      console.log(editar);
    this.router.navigate(["/home"]);
  }
  
  
  excluirConfirm(){
    this.presentConfirmAlert("Confirmação", "Deseja excluir o livro?", "Ao excluir o livro, não será possível recuperá-lo.")
  }

  excluirLivro(){
    this.firebaseService.delete(this.livro.id);
    this.router.navigate(['/home'])
    this.presentAlert("Sucesso", "Livro Excluído com Sucesso");
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

  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string)
  {
    const alert = await this.alertController.create({
    header: titulo,
    subHeader: subtitulo,
    message: msg,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: ()=>{}},
      {
        text: 'Confirmar',
        role: 'confirmar',
        handler:() =>{
          this.excluirLivro();
        }
      }
    ],
    })
    await alert.present();
  }


  ngOnInit() {
    this.livro = history.state.livro;
    this.titulo = this.livro.titulo;
    this.autor = this.livro.autor;
    this.ano = this.livro.ano;
    this.genero = this.livro.genero;
    this.editora = this.livro.editora;
    
  }

}
