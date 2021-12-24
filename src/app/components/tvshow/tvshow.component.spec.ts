import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from 'src/app/services/search.service';
import { TvshowService } from 'src/app/services/tvshow.service';
import { TvshowComponent } from './tvshow.component';

describe('TvshowComponent', () => {
  let component: TvshowComponent;
  let fixture: ComponentFixture<TvshowComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvshowComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        [TvshowService],
        [SearchService],
      ],
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowComponent);
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
    component.shows.total_pages = 10;
    component.nextPage();
    expect(component.displayPage).toBeGreaterThan(page);
  });

  it('should go to previous page', () => {
    component.displayPage = 2;
    const page = component.displayPage;
    component.searchQuery = 'pirate';
    searchService.setLatestSearch('pirate');
    component.shows.total_pages = 10;
    component.previousPage();
    expect(component.displayPage).toBeLessThan(page);
  });
});
