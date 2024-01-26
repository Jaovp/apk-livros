import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import { Genero, Livro } from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  formAtualizar : FormGroup;

  constructor(private router: Router, private firebaseService: FirebaseService, private alertController: AlertController, private authService : AuthService, private alert : AlertService, private formBuilder : FormBuilder) {
    this.formAtualizar = new FormGroup({
      titulo : new FormControl(''),
      autor : new FormControl(''),
      ano: new FormControl(''),
      genero: new FormControl(''),
      editora : new FormControl('')
    })
    this.user = this.authService.getUserLogged();
   }

   get errorControl(){
    return this.formAtualizar.controls;
  }

  submitForm() : boolean{
    if(!this.formAtualizar.valid){
      this.alert.presentAlert('Erro', 'Erro ao Preencher!');
      return false;
    }else{
      this.alert.simpleLoader();
      this.atualizar();
      return true;
    }
  }

  habilitarEdicao() {
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
      const { titulo, autor, ano, genero, editora } = this.formAtualizar.value;
      let editar: Livro = new Livro(titulo, autor, ano, genero, editora);
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
    
    this.formAtualizar = this.formBuilder.group({
      titulo : [this.livro.titulo, [Validators.required]],
      autor : [this.livro.autor,[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      ano : ['',[Validators.required, Validators.min(1000), Validators.max(2050)]],
      genero : [this.livro.genero,[Validators.required]],
      editora : [this.livro.editora,[Validators.required]]
    });
  }

}
