
// delcare type properties relied on the fields in the api server
export interface MovieType {
  id: number;
  title: string;
  original_language: string;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
  adult: boolean;
  popularity: number;
};

export interface SavedMovieType {
  id: number;
  title: string;
  img: string;
}
