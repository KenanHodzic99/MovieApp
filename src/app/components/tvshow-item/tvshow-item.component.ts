import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Genre } from 'src/app/interfaces/Genre';
import { TVShow } from 'src/app/interfaces/TVShow';
import { GenreService } from 'src/app/services/genre.service';

/*eslint-disable no-return-assign*/

@Component({
  selector: 'app-tvshow-item',
  templateUrl: './tvshow-item.component.html',
  styleUrls: ['./tvshow-item.component.css'],
})
export class TvshowItemComponent implements OnInit {
  @Input() show!: TVShow;

  imagePath :string = 'https://image.tmdb.org/t/p/w500/';

  posterPath: string = 'https://image.tmdb.org/t/p/w185/';

  iconStar = faStar;

  showGenres: Genre[] = [];

  constructor(private genreService: GenreService) {
    this.genreService.tvShowGenres.subscribe(
      (genre) => this.showGenres = genre.genres.filter(
        (findGenre) => this.show.genre_ids.includes(findGenre.id),
      ),
    );
  }

  ngOnInit(): void {
    this.imagePath += this.show.backdrop_path;

    if (this.show.poster_path === null || this.show.poster_path.match(/^ *$/) !== null) {
      this.posterPath = 'https://via.placeholder.com/185x278?text=No+Image';
    } else {
      this.posterPath += this.show.poster_path;
    }

    if (this.show.overview === null || this.show.overview.match(/^ *$/) !== null) {
      this.show.overview = 'Unfortunately, there is no overview available for this movie.';
    } else {
      if (this.show.name.length >= 60) {
        if (this.show.overview.length > 100) {
          this.show.overview = this.show.overview.slice(0, 150);
          this.show.overview += '...';
        }
      } else if (this.show.name.length >= 30) {
        if (this.show.overview.length > 180) {
          this.show.overview = this.show.overview.slice(0, 180);
          this.show.overview += '...';
        }
      } else if (this.show.overview.length > 215) {
        this.show.overview = this.show.overview.slice(0, 215);
        this.show.overview += '...';
      }

      if (this.show.genre_ids.length > 5) {
        if (this.show.name.length >= 30) {
          if (this.show.overview.length > 100) {
            this.show.overview = this.show.overview.slice(0, 100);
            this.show.overview += '...';
          }
        } else if (this.show.overview.length > 150) {
          this.show.overview = this.show.overview.slice(0, 150);
          this.show.overview += '...';
        }
      }
    }

    this.show.first_air_date = this.show.first_air_date.slice(0, 4);
  }
}
