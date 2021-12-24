import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Genre } from 'src/app/interfaces/Genre';
import { GenreService } from 'src/app/services/genre.service';

/* eslint no-return-assign: 0*/

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;

  imagePath :string = 'https://image.tmdb.org/t/p/w500/';

  posterPath: string = 'https://image.tmdb.org/t/p/w185/';

  iconStar = faStar;

  movieGenres: Genre[] = [];

  constructor(private genreService: GenreService) {
    this.genreService.genres.subscribe(
      (genre) => this.movieGenres = genre.genres.filter(
        (findGenre) => this.movie.genre_ids.includes(findGenre.id),
      ),
    );
  }

  ngOnInit(): void {
    this.imagePath += this.movie.backdrop_path;

    if (this.movie.poster_path === null || this.movie.poster_path.match(/^ *$/) !== null) {
      this.posterPath = 'https://via.placeholder.com/185x278?text=No+Image';
    } else {
      this.posterPath += this.movie.poster_path;
    }

    if (this.movie.overview === null || this.movie.overview.match(/^ *$/) !== null) {
      this.movie.overview = 'Unfortunately, there is no overview available for this movie.';
    } else {
      if (this.movie.title.length >= 60) {
        if (this.movie.overview.length > 100) {
          this.movie.overview = this.movie.overview.slice(0, 150);
          this.movie.overview += '...';
        }
      } else if (this.movie.title.length >= 30) {
        if (this.movie.overview.length > 180) {
          this.movie.overview = this.movie.overview.slice(0, 180);
          this.movie.overview += '...';
        }
      } else if (this.movie.overview.length > 215) {
        this.movie.overview = this.movie.overview.slice(0, 215);
        this.movie.overview += '...';
      }

      if (this.movie.genre_ids.length > 5) {
        if (this.movie.title.length >= 30) {
          if (this.movie.overview.length > 100) {
            this.movie.overview = this.movie.overview.slice(0, 100);
            this.movie.overview += '...';
          }
        } else if (this.movie.overview.length > 150) {
          this.movie.overview = this.movie.overview.slice(0, 150);
          this.movie.overview += '...';
        }
      }
    }

    this.movie.release_date = this.movie.release_date.slice(0, 4);
  }
}
