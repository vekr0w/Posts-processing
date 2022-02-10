import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  host: { style: 'width:90%;' },
})
export class PostsComponent {
  constructor(){}
}
