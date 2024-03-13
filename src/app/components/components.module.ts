import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { IonicModule } from '@ionic/angular';
import { LoadingLivrosComponent } from './loading-livros/loading-livros.component';
import { EmptyLivrosComponent } from './empty-livros/empty-livros.component';



@NgModule({
  declarations: [BookComponent, LoadingLivrosComponent, EmptyLivrosComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookComponent, LoadingLivrosComponent, EmptyLivrosComponent]
})
export class ComponentsModule { }
