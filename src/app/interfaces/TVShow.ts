import { Genre } from './Genre';
import {
  ProductionCompany, ProductionCountry, SpokenLanguage, VideoList,
} from './Movie';

export interface TVShow{
  backdrop_path: string;
  created_by: Director[];
  episode_run_time: number[];
  last_air_date: string;
  first_air_date: string;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air?: number;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: VideoList;
}

export interface Season{
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Network{
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface Episode{
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Director{
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
