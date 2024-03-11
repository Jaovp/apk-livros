import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookComponent]
})
export class ComponentsModule { }
