import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie.service';
import { genreAsyncValidator } from '../../services/movies-validator';

@Component({
  selector: 'ngm-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieForm = this.fb.group({
    title: this.fb.control('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    genre: this.fb.control('', {
      nonNullable: true,
      updateOn: 'blur',
      validators: Validators.required,
      asyncValidators: genreAsyncValidator(this.movieService),
    }),
    year: this.fb.control('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    plot: this.fb.control('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    poster: this.fb.control('', { nonNullable: true }),
  });
  #isNewMovie!: boolean;
  #movieId!: string;

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
            .pipe(tap((movie) => (this.#movieId = movie.id)))
        )
      )
      .subscribe((movie) => this.movieForm.patchValue(movie));
  }

  onSubmit(): void {
    const { value } = this.movieForm;
    const modifiedMovie = {
      id: this.#movieId,
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
