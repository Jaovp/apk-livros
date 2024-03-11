import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Livro } from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('searchbar') searchbar!: IonSearchbar;
  lista_livros: Livro[] = [];
  livro: Livro[] = [];
  public user: any;
  isLoading: boolean = false;
  query: any;

  
  //this.lista_livros.push(new Livro("O Senhor dos Anéis", "J. R. R. Tolkien", 1954, "Fantasia", "Allen & Unwin"));
  //this.lista_livros.push(new Livro("O Hobbit", "J. R. R. Tolkien", 1937, "Fantasia", "Allen & Unwin"));
  
  constructor(private router: Router, private firebase: FirebaseService, private authService: AuthService) {
    this.isLoading = true;
    this.user = this.authService.getUserLogged();
    console.log(this.user);
    this.firebase.read(this.user.uid).subscribe(res => {
      this.lista_livros = res.map( livro => {
        return {
          id: livro.payload.doc.id,
          ...livro.payload.doc.data() as any
        } as Livro;
      });
    })
  };


  cadastrar(){
    this.router.navigate(['/cadastrar']);
  }

  editar(Livro: Livro){
    this.router.navigateByUrl("/detalhar",
    {state: {livro:Livro}});
  }

  logout(){
    this.authService.signOut()
    .then((res) => {
      this.router.navigate(['/signin']);
    });
  }

  async onSearchChange(event : any) {
    this.query = event.detail.value.toLowerCase();
    this.livro = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.livro = this.lista_livros.filter((livro: Livro) =>
        livro.titulo && livro.titulo.toLowerCase().includes(this.query)
      );
        console.log(this.livro);
        this.isLoading = false;
      }, 2000);
    }
  }

}
