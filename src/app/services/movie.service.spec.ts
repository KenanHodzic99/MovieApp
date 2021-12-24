import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MovieService } from './movie.service';
import { Movie } from '../interfaces/Movie';
import { MoviesList } from '../interfaces/MoviesList';

describe('MovieService', () => {
  let service: MovieService;

  const testMovie: Movie = {
    adult: false,
    backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
    belongs_to_collection: {},
    budget: 63000000,
    genre_ids: [18],
    genres: [
      {
        id: 18,
        name: 'Drama',
      },
    ],
    homepage: '',
    id: 550,
    imdb_id: 'tt0137523',
    original_language: 'en',
    original_title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
    popularity: 0.5,
    poster_path: '',
    production_companies: [
      {
        id: 508,
        logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
        name: 'Regency Enterprises',
        origin_country: 'US',
      },
      {
        id: 711,
        logo_path: '',
        name: 'Fox 2000 Pictures',
        origin_country: '',
      },
      {
        id: 20555,
        logo_path: '',
        name: 'Taurus Film',
        origin_country: '',
      },
      {
        id: 54050,
        logo_path: '',
        name: 'Linson Films',
        origin_country: '',
      },
      {
        id: 54051,
        logo_path: '',
        name: 'Atman Entertainment',
        origin_country: '',
      },
      {
        id: 54052,
        logo_path: '',
        name: 'Knickerbocker Films',
        origin_country: '',
      },
      {
        id: 25,
        logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
        name: '20th Century Fox',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '1999-10-12',
    revenue: 100853753,
    runtime: 139,
    spoken_languages: [
      {
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Released',
    tagline: "How much can you know about yourself if you've never been in a fight?",
    title: 'Fight Club',
    video: false,
    vote_average: 7.8,
    vote_count: 3439,
    videos: {
      results: [
        {
          iso_639_1: 'en',
          iso_3166_1: 'US',
          name: 'Fight Club - Theatrical Trailer Remastered in HD',
          key: '6JnN1DmbqoU',
          site: 'YouTube',
          size: 1080,
          type: 'Trailer',
          official: false,
          published_at: '2015-02-26T03:19:25.000Z',
          id: '5e382d1b4ca676001453826d',
        },
        {
          iso_639_1: 'en',
          iso_3166_1: 'US',
          name: 'Fight Club | #TBT Trailer | 20th Century FOX',
          key: 'BdJKm16Co6M',
          site: 'YouTube',
          size: 1080,
          type: 'Trailer',
          official: true,
          published_at: '2014-10-02T19:20:22.000Z',
          id: '5c9294240e0a267cd516835f',
        },
      ],
    },
  };

  const movieList: MoviesList = { results: [testMovie, testMovie, testMovie], total_pages: 1 };

  let serviceStub: any;

  beforeEach(() => {
    serviceStub = {
      getMovies: () => of(movieList),
      getMovieById: () => of(testMovie),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: MovieService, useValue: serviceStub }],
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should return movies', () => {
    service.getMovies().subscribe((movies) => {
      expect(movies).toEqual(movieList);
    });
  });

  it('should return movie with the same id', () => {
    service.getMovieById('550').subscribe((movie) => {
      expect(movie.id).toBe(movie.id);
    });
  });
});
