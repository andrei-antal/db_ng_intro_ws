import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from '../movies/components/movie-detail/movie-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/new', component: MovieDetailComponent },
      { path: 'movies/:id', component: MovieDetailComponent },
    ]),
  ],
  declarations: [MovieItemComponent, MovieListComponent, MovieDetailComponent],
  exports: [MovieItemComponent, MovieListComponent],
})
export class MoviesModule {}
