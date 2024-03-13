import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { IonicModule } from '@ionic/angular';
import { LoadingLivrosComponent } from './loading-livros/loading-livros.component';



@NgModule({
  declarations: [BookComponent, LoadingLivrosComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookComponent, LoadingLivrosComponent]
})
export class ComponentsModule { }
