import { Component, OnInit } from '@angular/core';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'ngm-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$ = this.movieService.movies$;

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies();
  }

  trackByFn(_: any, movie: any): number {
    return movie.id;
  }

  handleCommentUpdate(commentPayload: CommentUpdate): void {
    this.movieService
      .updateComment(commentPayload.id, commentPayload.newComment)
      .subscribe();
  }

  handleMovieDelete(movieId: string): void {
    this.movieService.deleteMovie(movieId).subscribe();
  }
}
