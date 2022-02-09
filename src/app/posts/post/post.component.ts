import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsDataService } from '../shared/services/posts-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: { style: 'width:90%; height:70%' },
})
export class PostComponent implements OnInit, AfterViewInit {
  public isEditable = false;
  public isEditPage = this.router.url.includes('edit');
  public canAddNew = this.router.url.includes('add');
  public postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  public postForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsDataService: PostsDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.canAddNew) {
      this.postForm = new FormGroup({
        id: new FormControl(0),
        userId: new FormControl(0),
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
      });
      this.isEditable = true;
    } else {
      this.postsDataService.getPostById(this.postId).subscribe({
        next: (post) => {
          this.postForm = new FormGroup({
            id: new FormControl(post.id),
            userId: new FormControl(post.userId),
            title: new FormControl(post.title, Validators.required),
            body: new FormControl(post.body, Validators.required),
          });
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.postForm.controls['userId'].disable();
    this.postForm.controls['id'].disable();
    if (!this.canEdit()) {
      this.postForm.controls['title'].disable();
      this.postForm.controls['body'].disable();
    } else {
      this.postForm.controls['title'].enable();
      this.postForm.controls['body'].enable();
    }
  }

  sendUpdatedPostData() {
    this.postsDataService
      .updatePost(this.postId, this.postForm.value)
      .subscribe({
        next: (el) => console.log(el),
        error: (err) => console.log(err),
      });
  }

  sendPost() {
    if (this.postForm.valid) {
      this.postsDataService.sendNewPost(this.postForm.value).subscribe({
        next: (el) => console.log(el),
      });
      this.router.navigateByUrl('posts');
    } else {
      alert(`The form status is: ${this.postForm.valid}`);
    }
  }

  goToEditPage(id: any): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }

  canEdit(): boolean {
    const test = this.isEditPage || this.isEditable;
    return test;
  }

  inputEnabler() {}
  // Form
}

/*
0. Implement angular form
1. Implement clean input fields/text-area - done
2. Implement preloaded data - done
3. Implement edit button functionality - done
4. Implement add button functionaility
*/
