import { Genre } from './Genre';

export interface Movie{
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genre_ids: number[];
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: VideoList;
}

export interface VideoList{
  results: Video[];
}

export interface Video{
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface ProductionCompany{
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountry{
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage{
  iso_639_1: string;
  name: string;
}
