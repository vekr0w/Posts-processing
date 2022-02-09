import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/config/variables';
import { Post } from '../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  constructor(private http: HttpClient) {}

  public getPostsRequest(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl);
  }

  public deletePostRequest(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  public deleteLocalPost(postId: number, posts: Post[]): Post[] {
    const postIndex = posts.findIndex((el) => el.id === postId);
    posts.splice(postIndex, 1);
    return posts;
  }

  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${baseUrl}/${id}`);
  }

  public updatePost(id: number, changes: {}): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, { ...changes });
  }
  public sendNewPost(newPost: {}): Observable<any> {
    return this.http.post(baseUrl, newPost);
  }
}
