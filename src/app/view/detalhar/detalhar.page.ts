import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Genero, Livro } from 'src/app/model/entities/Livro';
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

  constructor(private router: Router, private firebaseService: FirebaseService, private alertController: AlertController) { }

  habilitarEdicao(){
    if(this.edicao){
      this.edicao = false
    }else{
      this.edicao = true
    }
  }

  atualizar(){
      let editar: Livro = new Livro(this.titulo, this.autor, this.ano, this.genero, this.editora);
      try{
        this.firebaseService.update(editar, this.livro.id).then(res => {this.presentAlert("Sucesso", "Livro Atualizado!");
        this.router.navigate(['/home']);});
      }
      catch(error){
        this.presentAlert("Erro", "Todos os campos são obrigatórios!");
        console.log(error);
      }
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
