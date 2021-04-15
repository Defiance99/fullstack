import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReview, Review } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient
  ) { }

  create(review: CreateReview): Observable<Review> {
    return this.http.post<Review>('/api/review/create', review);
  }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>('/api/review/getAll');
  }

  getByLimit(limit: number): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/review/getByLimit?limit=${limit}`);
  }
}
