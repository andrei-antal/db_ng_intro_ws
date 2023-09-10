import { Injectable } from '@angular/core';
import { produce } from 'immer';
import { MOVIES_LIST } from '../model/movie-data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies = MOVIES_LIST;

  updateComment(movieId: string, newComment: string): void {
    const index = this.movies.findIndex((movie) => movie.id === movieId);
    this.movies = produce(this.movies, (draft) => {
      draft[index].comment = newComment;
    });
  }

  deleteMovie(movieId: string): void {
    const index = this.movies.findIndex((movie) => movie.id === movieId);
    this.movies = produce(this.movies, (draft) => {
      draft.splice(index, 1);
    });
  }
}
