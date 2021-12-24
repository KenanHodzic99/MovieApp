import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Season } from 'src/app/interfaces/TVShow';
import { TvshowSeasonDetailsComponent } from './tvshow-season-details.component';

describe('TvshowSeasonDetailsComponent', () => {
  let component: TvshowSeasonDetailsComponent;
  let fixture: ComponentFixture<TvshowSeasonDetailsComponent>;

  const testSeason: Season = {
    air_date: '2010-12-05',
    episode_count: 64,
    id: 3627,
    name: 'Specials',
    overview: '',
    poster_path: '/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg',
    season_number: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [TvshowSeasonDetailsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowSeasonDetailsComponent);
    component = fixture.componentInstance;
    component.season = testSeason;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
