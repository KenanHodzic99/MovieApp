import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenreList } from '../interfaces/GenreList';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  apiUrlMovie: string = 'https://api.themoviedb.org/3/genre/movie/list?';

  apiUrlTVShow: string = 'https://api.themoviedb.org/3/genre/tv/list?';

  apiKey: string = 'api_key=95f137d8df01dca53ab1cc38b1ec0ab7';

  genres: Observable<GenreList>;

  tvShowGenres: Observable<GenreList>;

  constructor(private http: HttpClient) {
    this.genres = this.http.get<GenreList>(`${this.apiUrlMovie + this.apiKey}&language=en-US`);
    this.tvShowGenres = this.http.get<GenreList>(`${this.apiUrlTVShow + this.apiKey}&language=en-US`);
  }
}
