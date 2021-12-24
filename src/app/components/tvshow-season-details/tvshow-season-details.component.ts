import { Component, Input, OnInit } from '@angular/core';
import { Season } from 'src/app/interfaces/TVShow';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tvshow-season-details',
  templateUrl: './tvshow-season-details.component.html',
  styleUrls: ['./tvshow-season-details.component.css'],
  animations: [
    trigger('Expand', [
      state('true', style({ height: '100%' })),
      state('false', style({ height: '0px', padding: '0px' })),
      transition('false <=> true', [
        animate(100),
      ]),
    ]),
  ],
})
export class TvshowSeasonDetailsComponent implements OnInit {
  @Input() season!: Season;

  seasonPosterPath: string = 'https://image.tmdb.org/t/p/w185/';

  expandIcon = faExpandAlt;

  animationState: boolean = false;

  ngOnInit(): void {
  }

  generateOverview(overview: string): string {
    if (overview === null || overview.match(/^ *$/) !== null) {
      return 'Unfortunately, there is no overview available for this season.';
    }

    return overview;
  }

  showSeasonInfo(): void {
    this.animationState = !this.animationState;
  }

  generateSeasonPosterUrl(posterid: string): string {
    if (posterid === null || posterid.match(/^ *$/) !== null) {
      return 'https://via.placeholder.com/185x278?text=No+Image';
    }

    return this.seasonPosterPath + posterid;
  }

  generateFormatedDate(date: string): string {
    if (date === null || date.match(/^ *$/) !== null) {
      return 'Unknown';
    }

    let newdate = date.replace('-', '.');
    newdate = newdate.replace('-', '.');
    return newdate;
  }
}
