import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-livros',
  templateUrl: './loading-livros.component.html',
  styleUrls: ['./loading-livros.component.scss'],
})
export class LoadingLivrosComponent  implements OnInit {

  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
