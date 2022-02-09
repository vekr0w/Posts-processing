import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/config/variables';
import { Post } from '../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  constructor(private http: HttpClient) {}

  getPostsRequest() {
    return this.http.get<Post[]>(baseUrl);
  }

  deletePostRequest(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteLocalPost(postId: number, posts: Post[]): Post[] {
    const postIndex = posts.findIndex((el) => el.id === postId);
    posts.splice(postIndex, 1);
    return posts;
  }

  getPostById(id: number) {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
