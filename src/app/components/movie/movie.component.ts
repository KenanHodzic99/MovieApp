import { Component, OnInit } from '@angular/core';
import { MoviesList } from 'src/app/interfaces/MoviesList';
import { MovieService } from 'src/app/services/movie.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight, faArrowAltCircleLeft, faFrown } from '@fortawesome/free-regular-svg-icons';
import {
  trigger, state, style, animate, transition,
} from '@angular/animations';
import { SearchService } from 'src/app/services/search.service';

/* eslint no-return-assign: 0*/

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  animations: [
    trigger('Grow', [
      state('true', style({ width: '40%', margin: '0% 0% 0% 30%' })),
      state('false', style({ width: '24%', margin: '0% 0% 0% 38%' })),
      transition('false <=> true', [
        animate(500),
      ]),
    ]),
  ],
})
export class MovieComponent implements OnInit {
  movies: MoviesList = { results: [], total_pages: 0 };

  searchIcon = faSearch;

  arrowLeftIcon = faArrowAltCircleLeft;

  arrowRightIcon = faArrowAltCircleRight;

  sadSmiley = faFrown;

  animationState: boolean = false;

  hasResults: boolean = true;

  searchQuery: string = '';

  displayPage: number = 1;

  constructor(private movieService: MovieService, private searchService: SearchService) {  }

  ngOnInit(): void {
    this.searchQuery = this.searchService.getLatestSearch();
    this.displayPage = this.searchService.getLatestMoviePage();

    if (this.searchQuery === null || this.searchQuery.match(/^ *$/) !== null) {
      this.movieService.getMovies().subscribe((movies) => this.movies.results = movies.results.filter((item, index) => index < 10));
    } else {
      this.filterMovies();
    }
  }

  showSearchBar(): void {
    if (!(this.animationState === true && !(this.searchQuery === null || this.searchQuery.match(/^ *$/) !== null))) {
      this.animationState = !this.animationState;
    }
  }

  filterMovies(): void {
    if (this.searchQuery.length > 3) {
      if (this.searchQuery === this.searchService.getLatestSearch()) {
        this.movieService.searchMovies(this.searchQuery, this.displayPage).subscribe((movies) => {
          this.movies = movies;
          this.hasResults = movies.results.length > 0;
        });
      } else {
        this.searchService.setLatestSearch(this.searchQuery);
        this.searchService.setLatestMoviePage(1);
        this.displayPage = 1;
        this.movieService.searchMovies(this.searchQuery, this.displayPage).subscribe((movies) => {
          this.movies = movies;
          this.hasResults = movies.results.length > 0;
        });
      }
    } else {
      this.hasResults = true;
      this.movieService.getMovies().subscribe((movies) => this.movies.results = movies.results.filter((item, index) => index < 10));
      this.displayPage = 1;
      this.searchService.setLatestMoviePage(1);
      this.searchService.setLatestSearch('');
    }
  }


  nextPage(): void {
    if (this.movies.total_pages > this.displayPage) {
      this.displayPage += 1;
      this.searchService.setLatestMoviePage(this.displayPage);
      this.filterMovies();
      window.scroll(0, 0);
    }
  }

  previousPage(): void {
    if (this.displayPage > 1) {
      this.displayPage -= 1;
      this.searchService.setLatestMoviePage(this.displayPage);
      this.filterMovies();
      window.scroll(0, 0);
    }
  }
}
