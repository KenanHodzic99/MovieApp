import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieService } from 'src/app/services/movie.service';
import { SearchService } from 'src/app/services/search.service';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        MovieService,
        SearchService,
      ],
    })
      .compileComponents();
    searchService = TestBed.inject(SearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should go to next page', () => {
    const page = component.displayPage;
    component.searchQuery = 'pirate';
    searchService.setLatestSearch('pirate');
    component.movies.total_pages = 10;
    component.nextPage();
    expect(component.displayPage).toBeGreaterThan(page);
  });

  it('should go to previous page', () => {
    component.displayPage = 2;
    const page = component.displayPage;
    component.searchQuery = 'pirate';
    searchService.setLatestSearch('pirate');
    component.movies.total_pages = 10;
    component.previousPage();
    expect(component.displayPage).toBeLessThan(page);
  });
});
