import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { GenreService } from './genre.service';
import { GenreList } from '../interfaces/GenreList';

describe('GenreService', () => {
  let service: GenreService;

  let serviceStub: any;

  const movieGenres: GenreList =     {
    genres: [
      {
        id: 28,
        name: 'Action',
      },
    ],
  };
  const showGenres: GenreList = {
    genres: [
      {
        id: 10759,
        name: 'Action & Adventure',
      },
    ],
  };

  beforeEach(() => {
    serviceStub = {
      genres: of(movieGenres),
      tvShowGenres: of(showGenres),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: GenreService, useValue: serviceStub }],
    });
    service = TestBed.inject(GenreService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should contain movie genres', () => {
    service.genres.subscribe((result: GenreList) => {
      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.objectContaining(movieGenres));
    });
  });

  it('should contain tvshow genres', () => {
    service.tvShowGenres.subscribe((result: GenreList) => {
      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.objectContaining(showGenres));
    });
  });
});
