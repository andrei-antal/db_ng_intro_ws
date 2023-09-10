import { Component } from '@angular/core';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'ngm-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  constructor(public movieService: MovieService) {}

  trackByFn(_: any, movie: any): number {
    return movie.id;
  }

  handleCommentUpdate(commentPayload: CommentUpdate): void {
    this.movieService.updateComment(
      commentPayload.id,
      commentPayload.newComment
    );
  }

  handleMovieDelete(movieId: string): void {
    this.movieService.deleteMovie(movieId);
  }
}
