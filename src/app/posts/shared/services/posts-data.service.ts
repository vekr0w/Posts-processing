import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/config/variables';
import { Post } from '../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(baseUrl);
  }
}
