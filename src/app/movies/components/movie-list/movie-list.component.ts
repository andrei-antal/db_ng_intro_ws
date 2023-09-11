import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommentUpdate } from '../movie-item/movie-item.component';
import { MovieService } from '../../services/movie.service';
import {
  Subject,
  debounceTime,
  fromEvent,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'ngm-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit, OnDestroy {
  movies$ = this.movieService.movies$;
  @ViewChild('searchField') searchField!: ElementRef;
  #destroy$ = new Subject<void>();

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchField.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map((ev: any) => ev.target.value),
        startWith(''),
        takeUntil(this.#destroy$)
      )
      .subscribe((searchTerm) => this.movieService.getMovies(searchTerm));
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
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
