import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { map, filter, switchMap, tap } from 'rxjs';
import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'ngm-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieForm = this.fb.group({
    title: this.fb.control('', { nonNullable: true }),
    genre: this.fb.control('', { nonNullable: true }),
    year: this.fb.control('', { nonNullable: true }),
    plot: this.fb.control('', { nonNullable: true }),
    poster: this.fb.control('', { nonNullable: true }),
  });
  #isNewMovie!: boolean;
  #movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramsMap) => paramsMap.get('id') as string),
        tap((movieId) => (this.#isNewMovie = !!movieId)),
        switchMap((movieId) =>
          this.movieService
            .getMovie(movieId)
            .pipe(tap((movie) => (this.#movie = movie)))
        )
      )
      .subscribe((movie) => this.movieForm.patchValue(movie));
  }

  onSubmit(): void {
    const { value } = this.movieForm;
    const modifiedMovie = {
      ...this.#movie,
      ...value,
    };
    if (!this.#isNewMovie) {
      this.movieService
        .createMovie(modifiedMovie as Movie)
        .subscribe(() => this.goBack());
    } else {
      this.movieService
        .updateMovie(modifiedMovie as Movie)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
