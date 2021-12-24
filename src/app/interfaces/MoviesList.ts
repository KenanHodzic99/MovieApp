import { Movie } from './Movie';

export interface MoviesList{
  page?: number;
  results: Movie[];
  total_results?: number;
  total_pages: number;
}
