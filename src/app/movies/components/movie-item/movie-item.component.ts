import { Component } from '@angular/core';

@Component({
  selector: 'ngm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  title = 'Fight Club';
  year = '1999';
  genre = 'Mystery, Thriller, Drama';
  plot =
    "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.";
  poster =
    'https://resizing.flixster.com/0kbkzWG-fGf5yEZSmLw4VB_SpnQ=/206x305/v2/https://flxt.tmsimg.com/assets/p23069_p_v8_aa.jpg';

  movieComment = '';

  wordCount(comment: string): number {
    if (!comment || comment.length === 0) {
      return 0;
    } else {
      return comment.trim().replace(/  +/g, ' ').split(' ').length;
    }
  }
}
