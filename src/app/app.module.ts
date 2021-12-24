import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { TvshowItemComponent } from './components/tvshow-item/tvshow-item.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowSeasonDetailsComponent } from './components/tvshow-season-details/tvshow-season-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tvshows', pathMatch: 'full' },
  { path: 'tvshows', component: TvshowComponent },
  { path: 'tvshows/:id', component: TvshowDetailsComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieComponent,
    MovieItemComponent,
    TvshowComponent,
    TvshowItemComponent,
    MovieDetailsComponent,
    PageNotFoundComponent,
    TvshowDetailsComponent,
    TvshowSeasonDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
