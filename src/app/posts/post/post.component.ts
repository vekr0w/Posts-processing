import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../shared/models/shared.models';
import { PostsDataService } from '../shared/services/posts-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public isEditable = false;
  public isEditPage = this.router.url.includes('edit');
  public canAddNew = this.router.url.includes('add');
  public postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  public post: Post;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsDataService: PostsDataService
  ) {}

  ngOnInit(): void {
    if (this.canAddNew) {
      this.post = {
        userId: 0,
        id: 0,
        title: '',
        body: '',
      };
      this.isEditable = true;
    } else {
      this.postsDataService.getPostById(this.postId).subscribe({
        next: (p) => (this.post = p),
      });
    }
  }

  sendUpdatedPostData() {
    this.postsDataService.updatePost(this.post.id, this.post).subscribe({
      next: (el) => console.log(el),
      error: (err) => console.log(err),
    });
  }

  updateLocalPostData() {}

  goToEditPage(id: any): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }
  goToPosts() {
    this.router.navigateByUrl(`posts`);
  }

  canEdit(): boolean {
    const test = this.isEditPage || this.isEditable;
    return !test;
  }
}

/*
0. Implement angular form
1. Implement clean input fields/text-area - done
2. Implement preloaded data - done
3. Implement edit button functionality - done
4. Implement add button functionaility
*/
