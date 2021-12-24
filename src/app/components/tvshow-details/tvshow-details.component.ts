import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { TVShow } from 'src/app/interfaces/TVShow';
import { TvshowService } from 'src/app/services/tvshow.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoList } from 'src/app/interfaces/Movie';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css'],
})
export class TvshowDetailsComponent implements OnInit {
  show!: TVShow;

  imagePath :string = 'https://image.tmdb.org/t/p/w1280/';

  posterPath: string = 'https://image.tmdb.org/t/p/w300/';

  profilePath: string = 'https://image.tmdb.org/t/p/w92/';

  youtubeUrl: string = 'https://www.youtube.com/embed/';

  arrowLeft = faChevronLeft;

  starIcon = faStar;

  selectedVideoKey: string = '';

  hasCreators: boolean = true;

  constructor(
    private showService: TvshowService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {
    this.showService.getTVShowById(this.activatedRoute.snapshot.paramMap.get('id') as string).subscribe((show) => {
      this.show = show;
      this.hasCreators = show.created_by.length > 0;
    });
  }

  ngOnInit(): void {

  }

  hasVideo(videos: VideoList): boolean {
    if (videos.results.length > 0) {
      for (const video of videos.results) {
        if (video.site === 'YouTube' && video.type === 'Trailer') {
          this.selectedVideoKey = video.key;
          return true;
        }
      }
      return false;
    }
    return false;
  }

  getSafeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl + this.selectedVideoKey);
  }

  generatePosterUrl(posterId: string): string {
    if (posterId === null || posterId.match(/^ *$/) !== null) {
      return 'https://via.placeholder.com/300x450?text=No+Image';
    }

    return this.posterPath + posterId;
  }

  generateBackdropUrl(backdropId: string): string {
    if (backdropId === null || backdropId.match(/^ *$/) !== null) {
      return 'https://via.placeholder.com/1280/858585';
    }

    return this.imagePath + backdropId;
  }

  generateFormatedDate(date: string): string {
    if (date === null || date.match(/^ *$/) !== null) {
      return 'Unknown';
    }

    let newDate = date.replace('-', '.');
    newDate = newDate.replace('-', '.');
    return newDate;
  }

  generateOverview(overview: string): string {
    if (overview === null || overview.match(/^ *$/) !== null) {
      return 'Unfortunatelly, there is no overview available for this TV show.';
    }

    return overview;
  }

  generateProfilePath(profileId: string): string {
    if (profileId === null || profileId.match(/^ *$/) !== null) {
      return 'https://via.placeholder.com/125x160?text=No+Image';
    }

    return this.profilePath + profileId;
  }

  goBack() {
    this.location.back();
  }
}
