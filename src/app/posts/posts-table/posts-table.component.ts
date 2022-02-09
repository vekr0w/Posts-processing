import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../shared/models/shared.models';
import { Router } from '@angular/router';
import { PostsDataService } from '../shared/services/posts-data.service';

// const ELEMENT_DATA: Post[] = [
//   {
//     userId: 1,
//     id: 1,
//     title: 'H',
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//   },
//   {
//     userId: 1,
//     id: 1,
//     title: 'H',
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//   },
//   {
//     userId: 1,
//     id: 1,
//     title: 'H',
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//   },
//   {
//     userId: 1,
//     id: 1,
//     title: 'H',
//     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
//   },
// ];

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnDestroy, AfterViewInit, OnInit {
  public ELEMENT_DATA: Post[];
  private getPostsSubscription: any;
  public displayedColumns: string[] = [
    'id',
    'userId',
    'title',
    'description',
    'actions',
  ];
  //MatTableDataSource<Post>
  public dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private postDataService: PostsDataService
  ) {}
  ngOnInit(): void {
    this.getPostsSubscription = this.postDataService.getPosts().subscribe({
      next: (posts) => {
        this.ELEMENT_DATA = posts;
        this.dataSource = new MatTableDataSource<Post>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.log(error),
    });
  }

  ngAfterViewInit() {}

  goToPage(element: Post, event: any): void {
    const action: string = event.target.innerText;

    switch (action) {
      case 'Edit':
        this.goToEditPage(element.id);
        break;
      case 'Delete':
        this.deleteItem(element.id);
        break;

      default:
        this.goToDetails(element.id);
        break;
    }
  }

  goToEditPage(id: number): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }
  deleteItem(id: number): void {
    console.log('Im deleting');
  }
  goToDetails(id: number): void {
    this.router.navigateByUrl(`posts/${id}`);
  }

  ngOnDestroy(): void {}
}
