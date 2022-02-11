import { NgModule } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
import { MaterialModule } from '../material/material/material.module';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostComponent, PostsComponent, PostsTableComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [SlicePipe],
})
export class PostsModule {}
