const key = 'cf1067f63c54fb71cd96ee9ab5a65975';

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&year=2023`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=true&year=2023`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const requestsInfo = [
  {
    title: 'Trending now',
    requestUrl: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US`,
  },
  {
    title: 'Upcoming',
    requestUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  },
  {
    title: 'Popular',
    requestUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&year=2023`,
  },
  {
    title: 'Top Rated',
    requestUrl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  },
  {
    title: 'Horror',
    requestUrl: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=true&year=2023`,
  }
];

// get the genre of movie
// https://api.themoviedb.org/3/genre/movie/list

export default requests;