export interface Cinema {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface BaseResult {
  Response: string;
  Error?: string;
}

export interface SearchResult extends BaseResult {
  Search: Cinema[];
  totalResults: number;
}

export interface CinemaRating {
  Source: string;
  Value: string;
}

export interface CinemaDetails extends Cinema {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: CinemaRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface CinemaDetailsResult extends CinemaDetails, BaseResult {
}
