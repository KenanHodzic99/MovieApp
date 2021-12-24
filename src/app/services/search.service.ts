import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private static searchTerm: string = '';

  private static moviePageNumber: number = 1;

  private static tvshowPageNumber: number = 1;

  getLatestSearch() :string {
    return SearchService.searchTerm;
  }

  setLatestSearch(query: string): void {
    SearchService.searchTerm = query;
  }

  getLatestMoviePage() :number {
    return SearchService.moviePageNumber;
  }

  setLatestMoviePage(page: number): void {
    SearchService.moviePageNumber = page;
  }

  getLatestTvshowPage(): number {
    return SearchService.tvshowPageNumber;
  }

  setLatestTvshowPage(page: number): void {
    SearchService.tvshowPageNumber = page;
  }
}
