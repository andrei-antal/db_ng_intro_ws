import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Movie } from '../model/movie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  #movieApi = `${environment.apiUrl}/movies`;
  #movies$ = new Subject<Movie[]>();
  movies$ = this.#movies$.asObservable();

  constructor(private http: HttpClient) {}

  getMovies(searchTerm = ''): void {
    this.http
      .get<Movie[]>(`${this.#movieApi}?q=${searchTerm.trim()}`)
      .subscribe((data) => this.#movies$.next(data));
  }

  updateComment(movieId: string, newComment: string): Observable<Movie> {
    return this.http
      .patch<Movie>(`${this.#movieApi}/${movieId}`, { comment: newComment })
      .pipe(tap(() => this.getMovies()));
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(`${this.#movieApi}/${movieId}`)
      .pipe(tap(() => this.getMovies()));
  }
}
