import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../shared/models/shared.models';
import { Router } from '@angular/router';
import { PostsDataService } from '../shared/services/posts-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnDestroy, OnInit {
  private getPostsSubscription: Subscription;
  private deletePostSubscription: Subscription;
  public ELEMENT_DATA: Post[];
  public displayedColumns: string[] = [
    'id',
    'userId',
    'title',
    'description',
    'actions',
  ];
  public dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private postDataService: PostsDataService
  ) {}
  ngOnInit(): void {
    this.getPostsSubscription = this.postDataService
      .getPostsRequest()
      .subscribe({
        next: (posts) => {
          this.ELEMENT_DATA = posts;
          this.dataSourceUpdate();
        },
        error: (error) => console.log(error),
      });
  }

  goToEditPage(id: number): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }

  goToDetails(id: number): void {
    this.router.navigateByUrl(`posts/${id}`);
  }

  truncateTextContent(text: string, index: number): string {
    return text.length > index ? `${text.slice(0, index)}...` : text;
  }

  private dataSourceUpdate(): void {
    this.dataSource = new MatTableDataSource<Post>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  deleteItem(id: number): void {
    if (confirm(`Are you sure you want to delete the post with ID: ${id}`)) {
      this.deletePostSubscription = this.postDataService
        .deletePostRequest(id)
        .subscribe({
          error: (error) => alert(error),
        });
      this.ELEMENT_DATA = this.postDataService.deleteLocalPost(
        id,
        this.ELEMENT_DATA
      );
      this.dataSourceUpdate();
    }
  }

  ngOnDestroy(): void {
    this.getPostsSubscription.unsubscribe();
    this.deletePostSubscription.unsubscribe();
  }
}
