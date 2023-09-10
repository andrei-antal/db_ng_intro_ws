import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../../model/movie';

export interface CommentUpdate {
  id: string;
  newComment: string;
}

@Component({
  selector: 'ngm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnChanges {
  @Input() movie!: Movie;
  @Output() commentUpdate = new EventEmitter<CommentUpdate>();

  commentSaved = false;
  movieComment = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.movieComment = changes['movie'].currentValue.comment;
      this.commentSaved = this.movieComment.length > 0;
    }
  }

  wordCount(comment: string): number {
    if (!comment || comment.length === 0) {
      return 0;
    } else {
      return comment.trim().replace(/  +/g, ' ').split(' ').length;
    }
  }

  saveComment(): void {
    if (!this.commentSaved) {
      this.commentUpdate.emit({
        id: this.movie.id,
        newComment: this.movieComment,
      });
    } else {
      this.commentSaved = false;
    }
  }

  clearComment(): void {
    this.commentUpdate.emit({
      id: this.movie.id,
      newComment: '',
    });
  }
}
