import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight, faArrowAltCircleLeft, faFrown } from '@fortawesome/free-regular-svg-icons';
import { TVShowList } from 'src/app/interfaces/TVShowList';
import { TvshowService } from 'src/app/services/tvshow.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css'],
  animations: [
    trigger('Grow', [
      state('true', style({ width: '40%', margin: '0% 30% 0% 30%' })),
      state('false', style({ width: '30%', margin: '0% 35% 0% 35%' })),
      transition('false <=> true', [
        animate(250),
      ]),
    ]),
  ],
})
export class TvshowComponent implements OnInit {
  shows: TVShowList = { results: [], total_pages: 0 };

  searchIcon = faSearch;

  arrowLeftIcon = faArrowAltCircleLeft;

  arrowRightIcon = faArrowAltCircleRight;

  sadSmiley = faFrown;

  animationState: boolean = false;

  hasResults: boolean = true;

  searchQuery: string = '';

  displayPage: number = 1;

  constructor(private tvshowService: TvshowService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchQuery = this.searchService.getLatestSearch();
    this.displayPage = this.searchService.getLatestTvshowPage();

    if (this.searchQuery === null || this.searchQuery.match(/^ *$/) !== null) {
      //eslint-disable-next-line no-return-assign
      this.tvshowService.getTVShows().subscribe((shows) => this.shows.results = shows.results.filter((item, index) => index < 10));
    } else {
      this.filterTvShows();
    }
  }

  showSearchBar(): void {
    if (!(this.animationState === true && !(this.searchQuery === null || this.searchQuery.match(/^ *$/) !== null))) {
      this.animationState = !this.animationState;
    }
  }

  filterTvShows(): void {
    if (this.searchQuery.length >= 3) {
      if (this.searchQuery === this.searchService.getLatestSearch()) {
        this.tvshowService.searchTVShows(this.searchQuery, this.displayPage).subscribe((shows) => {
          this.shows = shows;
          this.hasResults = shows.results.length > 0;
        });
      } else {
        this.searchService.setLatestSearch(this.searchQuery);
        this.searchService.setLatestTvshowPage(1);
        this.displayPage = 1;
        this.tvshowService.searchTVShows(this.searchQuery, this.displayPage).subscribe((shows) => {
          this.shows = shows;
          this.hasResults = shows.results.length > 0;
        });
      }
    } else {
      this.hasResults = true;
      //eslint-disable-next-line no-return-assign
      this.tvshowService.getTVShows().subscribe((shows) => this.shows.results = shows.results.filter((item, index) => index < 10));
      this.displayPage = 1;
      this.searchService.setLatestTvshowPage(1);
      this.searchService.setLatestSearch('');
    }
  }

  nextPage(): void {
    if (this.shows.total_pages > this.displayPage) {
      this.displayPage += 1;
      this.searchService.setLatestTvshowPage(this.displayPage);
      this.filterTvShows();
      window.scroll(0, 0);
    }
  }

  previousPage(): void {
    if (this.displayPage > 1) {
      this.displayPage -= 1;
      this.searchService.setLatestTvshowPage(this.displayPage);
      this.filterTvShows();
      window.scroll(0, 0);
    }
  }
}
