import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, VideoList } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;

  imagePath :string = 'https://image.tmdb.org/t/p/w1280/';

  posterPath: string = 'https://image.tmdb.org/t/p/w300/';

  logoPath: string = 'https://image.tmdb.org/t/p/w92/';

  youtubeUrl: string = 'https://www.youtube.com/embed/';

  arrowLeft = faChevronLeft;

  starIcon = faStar;

  selectedVideoKey: string = '';

  hasProductionCompanies: boolean = true;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.movieService.getMovieById(this.activatedRoute.snapshot.paramMap.get('id') as string).subscribe((movie) => {
      this.movie = movie;
      this.hasProductionCompanies = movie.production_companies.length > 0;
    });
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
      return 'Unfortunately, there is no overview available for this movie.';
    }

    return overview;
  }

  generateLogoPath(logoId: string): string {
    if (logoId === null || logoId.match(/^ *$/) !== null) {
      return 'https://via.placeholder.com/125x100?text=No+Image';
    }

    return this.logoPath + logoId;
  }

  goBack() {
    this.location.back();
  }

  getSafeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl + this.selectedVideoKey);
  }
}
