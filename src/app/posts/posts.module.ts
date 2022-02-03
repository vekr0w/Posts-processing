import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [AddComponent, EditComponent, PostComponent, PostsComponent],
  imports: [CommonModule],
})
export class PostsModule {}
