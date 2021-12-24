import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TVShow } from '../interfaces/TVShow';
import { TVShowList } from '../interfaces/TVShowList';

@Injectable({
  providedIn: 'root',
})

export class TvshowService {
  private apiUrl = 'https://api.themoviedb.org/3/tv/';

  private searchUrl = 'https://api.themoviedb.org/3/search/tv?';

  private apiKey = 'api_key=95f137d8df01dca53ab1cc38b1ec0ab7';

  constructor(private http: HttpClient) { }

  getTVShows() : Observable<TVShowList> {
    return this.http.get<TVShowList>(`${this.apiUrl}top_rated?${this.apiKey}&language=en-US&page=1`);
  }

  searchTVShows(searchQuery: string, pageNumber: number) : Observable<TVShowList> {
    return this.http.get<TVShowList>(`${this.searchUrl}query=${searchQuery}&${this.apiKey}&language=en-US&page=${pageNumber}&include_adult=false`);
  }

  getTVShowById(id: string): Observable<TVShow> {
    return this.http.get<TVShow>(`${this.apiUrl + id}?${this.apiKey}&language=en-US&append_to_response=videos`);
  }
}
