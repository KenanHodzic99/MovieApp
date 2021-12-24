import { TVShow } from './TVShow';

export interface TVShowList{
  page?: number;
  results: TVShow[];
  total_results?: number;
  total_pages: number;
}
