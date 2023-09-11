import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, filter, switchMap } from 'rxjs';
import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'ngm-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map((paramsMap) => paramsMap.get('id') as string),
      filter((id) => !!id),
      switchMap((movieId) => this.movieService.getMovie(movieId))
    );
  }
}
