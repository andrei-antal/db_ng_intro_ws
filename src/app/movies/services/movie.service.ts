import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';
import { MOVIES_LIST } from '../model/movie-data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  #movies$ = new BehaviorSubject(MOVIES_LIST);
  movies$ = this.#movies$.asObservable();

  updateComment(movieId: string, newComment: string): void {
    const movies = this.#movies$.getValue();
    const index = movies.findIndex((movie) => movie.id === movieId);
    this.#movies$.next(
      produce(movies, (draft) => {
        draft[index].comment = newComment;
      })
    );
  }

  deleteMovie(movieId: string): void {
    const movies = this.#movies$.getValue();
    const index = movies.findIndex((movie) => movie.id === movieId);
    this.#movies$.next(
      produce(movies, (draft) => {
        draft.splice(index, 1);
      })
    );
  }
}
