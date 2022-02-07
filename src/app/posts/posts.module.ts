import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
import { MaterialModule } from '../material/material/material.module';
import { PostsTableComponent } from './posts-table/posts-table.component';

@NgModule({
  declarations: [AddComponent, EditComponent, PostComponent, PostsComponent, PostsTableComponent],
  imports: [CommonModule, MaterialModule],
})
export class PostsModule {}
