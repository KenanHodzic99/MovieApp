import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesList } from '../interfaces/MoviesList';
import { Movie } from '../interfaces/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/';

  private searchUrl = 'https://api.themoviedb.org/3/search/movie?';

  private apiKey = 'api_key=95f137d8df01dca53ab1cc38b1ec0ab7';

  constructor(private http: HttpClient) { }

  getMovies() : Observable<MoviesList> {
    return this.http.get<MoviesList>(`${this.apiUrl}top_rated?${this.apiKey}&language=en-US&page=1`);
  }

  searchMovies(searchQuery: string, pageNumber: number) : Observable<MoviesList> {
    return this.http.get<MoviesList>(`${this.searchUrl}query=${searchQuery}&${this.apiKey}&language=en-US&page=${pageNumber}&include_adult=false`);
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl + id}?${this.apiKey}&language=en-US&append_to_response=videos`);
  }
}
