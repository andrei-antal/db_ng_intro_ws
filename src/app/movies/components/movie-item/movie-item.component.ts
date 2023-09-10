import { Component, Input } from '@angular/core';
import { Movie } from '../../model/movie';

@Component({
  selector: 'ngm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  commentSaved = false;

  wordCount(comment: string): number {
    if (!comment || comment.length === 0) {
      return 0;
    } else {
      return comment.trim().replace(/  +/g, ' ').split(' ').length;
    }
  }

  saveComment(id: string): void {
    // const theMovie = this.movies.find((movie) => movie.id === id);
    // if (theMovie) {
    //   theMovie.commentSaved = !theMovie.commentSaved;
    // }
  }

  clearComment(id: string): void {
    // const theMovie = this.movies.find((movie) => movie.id === id);
    // if (theMovie) {
    //   theMovie.comment = '';
    //   theMovie.commentSaved = false;
    // }
  }
}
