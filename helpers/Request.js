const API_KEY = process.env.TMDB_API;

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchThriller: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchRest: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  fetchOthers: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
};

export default request;
