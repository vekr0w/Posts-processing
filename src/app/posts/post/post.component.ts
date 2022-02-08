import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public isEditable = false;
  public isEditPage = this.router.url.includes('edit');
  public canAdd = this.router.url.includes('add');
  public postId = this.activatedRoute.snapshot.paramMap.get('id');
  public userId: any = 123;
  public postTitle = 'Test title';
  public postStatus = 'Some test description';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.canAdd) {
      this.postId = '';
      this.userId = '';
      this.postTitle = '';
      this.postStatus = '';
      this.isEditable = true;
    }
  }

  goToEditPage(id: any): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }
  goToPosts() {
    this.router.navigateByUrl(`posts`);
  }
  // change url to posts/edit/id
  // send edit request to service
}
