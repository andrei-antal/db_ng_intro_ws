import { Component } from '@angular/core';

@Component({
  selector: 'ngm-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  movies = [
    {
      id: '1',
      title: 'Fight Club',
      year: '1999',
      genre: 'Mystery, Thriller, Drama',
      plot: "A depressed man (Edward Norton) suffering from insomnia meets a strange soap salesman named Tyler Durden (Brad Pitt) and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher, attracts Tyler's attention.",
      poster:
        'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
      comment: '',
      commentSaved: false,
    },
    {
      id: '2',
      title: 'Inception',
      year: '2010',
      genre: 'Sci-fi, Mystery, Thriller, Action',
      plot: "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.",
      poster:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      comment: '',
      commentSaved: false,
    },
    {
      id: '3',
      title: 'The Dark Knight',
      year: '2008',
      genre: 'Action, Adventure, Fantasy',
      plot: 'With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
      comment: '',
      commentSaved: false,
    },
    {
      id: '4',
      title: 'The Godfather',
      year: '1972',
      genre: 'Crime, Drama',
      plot: "Widely regarded as one of the greatest films of all time, this mob drama, based on Mario Puzo's novel of the same name, focuses on the powerful Italian-American crime family of Don Vito Corleone (Marlon Brando). When the don's youngest son, Michael (Al Pacino), reluctantly joins the Mafia, he becomes involved in the inevitable cycle of violence and betrayal. Although Michael tries to maintain a normal relationship with his wife, Kay (Diane Keaton), he is drawn deeper into the family business.",
      poster:
        'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
      comment: '',
      commentSaved: false,
    },
  ];

  wordCount(comment: string): number {
    if (!comment || comment.length === 0) {
      return 0;
    } else {
      return comment.trim().replace(/  +/g, ' ').split(' ').length;
    }
  }

  saveComment(id: string): void {
    const theMovie = this.movies.find((movie) => movie.id === id);
    if (theMovie) {
      theMovie.commentSaved = !theMovie.commentSaved;
    }
  }

  clearComment(id: string): void {
    const theMovie = this.movies.find((movie) => movie.id === id);
    if (theMovie) {
      theMovie.comment = '';
      theMovie.commentSaved = false;
    }
  }

  trackByFn(_: any, movie: any): number {
    return movie.id;
  }
}
