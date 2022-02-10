import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from '../shared/services/posts-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: { style: 'width:90%; height:70%' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public isEditable = false;
  public isEditPage = this.router.url.includes('edit');
  public canAddNew = this.router.url.includes('add');
  public postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  public postForm = new FormGroup({
    id: new FormControl(0),
    userId: new FormControl(0),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsDataService: PostsDataService
  ) {}

  ngOnInit(): void {
    if (this.canAddNew) {
      this.isEditable = true;
    } else {
      this.postsDataService
        .getPostById(this.postId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (post) => {
            this.postForm.setValue({
              id: post.id,
              userId: post.userId,
              title: post.title,
              body: post.body,
            });
          },
          error: (err) => alert(err),
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

  public sendUpdatedPostData(): void {
    this.postsDataService
      .updatePost(this.postId, this.postForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: (err) => console.log(err),
      });
    this.router.navigateByUrl('posts');
  }

  public sendPost(): void {
    if (this.postForm.valid) {
      this.postsDataService.sendNewPost(this.postForm.value).subscribe({
        error: (error) => alert(error),
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
