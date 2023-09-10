import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieItemComponent } from './components/movie-item/movie-item.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MovieItemComponent],
  exports: [MovieItemComponent],
})
export class MoviesModule {}
