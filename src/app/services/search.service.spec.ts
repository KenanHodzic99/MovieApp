import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should set and get latest search', () => {
    const searchQuery = 'spiderman';
    service.setLatestSearch(searchQuery);
    expect(service.getLatestSearch()).toBe(searchQuery);
  });

  it('should set and get latest movie page', () => {
    const pageNumber = 2;
    service.setLatestMoviePage(pageNumber);
    expect(service.getLatestMoviePage()).toBe(pageNumber);
  });

  it('should set and get latest tvshow page', () => {
    const pageNumber = 2;
    service.setLatestTvshowPage(pageNumber);
    expect(service.getLatestTvshowPage()).toBe(pageNumber);
  });
});
