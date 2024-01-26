import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  formCadastrar : FormGroup;

  titulo!: string;
  autor!: string;
  ano!: number;
  genero!: Genero;
  editora!: string;
  public imagem: any;
  user: any;
  anoAtual!: number;


  lista_livros: Livro[] = [];

  constructor(private alertController: AlertController, private firebase: FirebaseService, private router: Router, private authService: AuthService, private alert: AlertService, private formBuilder : FormBuilder) {
    this.formCadastrar = new FormGroup({
      titulo : new FormControl(''),
      autor : new FormControl(''),
      ano: new FormControl(''),
      genero: new FormControl(''),
      editora : new FormControl('')
    })
    this.user = this.authService.getUserLogged();
    this.anoAtual = new Date().getFullYear();
  }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      titulo : ['', [Validators.required]],
      autor : ['',[Validators.required]],
      ano : ['',[Validators.required, Validators.min(1), Validators.max(this.anoAtual)]],
      genero : ['',[Validators.required]],
      editora : ['',[Validators.required]]
    });
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm() : boolean{
    if(!this.formCadastrar.valid){
      this.alert.presentAlert('Erro', 'Erro ao Preencher!');
      return false;
    }else{
      this.alert.simpleLoader();
      this.cadastrarLivro();
      return true;
    }
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  
  cadastrarLivro(){
    const { titulo, autor, ano, genero, editora } = this.formCadastrar.value;
    if(titulo && autor && ano && genero && editora){
      let novo: Livro = new Livro(titulo, autor, ano, genero, editora);
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

  

}
