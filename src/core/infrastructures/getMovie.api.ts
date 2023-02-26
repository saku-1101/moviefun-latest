import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';
// import Movie from '../domains/models/movie.interface'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'x-api-key': env.API_KEY,
  },
});

const responseBody = (res: AxiosResponse) => {
  console.log(res);
  return res.data;
};

function getTheatreMovies(): Promise<void> {
  const date = new Date();
  let year: string = date.getUTCFullYear().toString();
  let month: string = (date.getUTCMonth() + 1).toString();
  let day: string = date.getUTCDate().toString();
  let query_lte = '';
  let query_gte = '';
  if (day.length == 1) {
    day = '0' + day;
  }
  if (month.length == 1) {
    month = '0' + month.toString();
  }
  query_lte = year + '-' + month + '-' + day;
  if (parseInt(month) - 1 < 1) {
    year = (parseInt(year) - 1).toString();
    month = (12 - (parseInt(month) - 1)).toString();
  }
  query_gte = year + '-' + month + '-' + day;
  const endpoint = '/discover/movie';
  const query_1: string =
    '&primary_release_date.gte=' + query_gte + '&primary_release_date.lte=' + query_lte + '&with_release_type=2%7C3'; // １ヶ月前〜今日
  const query_2 = '&sort_by=popularity.desc';
  const language = '&region=JP|US&language=ja-JA&page=1';
  const url = endpoint + '?api_key=' + env.API_KEY + language + query_1 + query_2;
  return axiosInstance
    .get(url)
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
}

function getPopMovies(): Promise<void> {
  const endpoint = '/movie/popular';
  const query = '&region=JP|US&language=ja-JA&page=1';
  const url: string = endpoint + '?api_key=' + env.API_KEY + query;
  return axiosInstance
    .get(url)
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
}

function getTopOfYear(): Promise<void> {
  const date: Date = new Date();
  const year: number = date.getUTCFullYear();
  const endpoint = '/discover/movie';
  const query_1 = '&primary_release_year=';
  const query_2 = '&sort_by=popularity.desc';
  const language = '&region=JP|US&language=ja-JA&page=1';
  const url = endpoint + '?api_key=' + env.API_KEY + language + query_1 + (year - 1).toString() + query_2;
  return axiosInstance
    .get(url)
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
}

function searchMovie(input: string): Promise<void> {
  const endpoint = '/search/movie';
  const language = '&language=ja-JA';
  const url = endpoint + '?api_key=' + env.API_KEY + '&query=' + input + language;
  return axiosInstance
    .get(url)
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
  // 多分const urlでも大丈夫．．．
  // UIにインプットしてる時→関数は発火されていない
  // 関数発火時→新たなセッション．関数もなんでも一新される？
  // もし，urlにconstが使えなかったら変数をgetに直入れ
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
// function getFavoriteMovies(params:type) {

// }
function getIDofMovies() {
  const endpoint = '/genre/movie/list';
  const language = '&language=ja-JA';
  const url = endpoint + '?api_key=' + env.API_KEY + language;
  return axiosInstance
    .get(url)
    .then(responseBody)
    .catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error(`Error: ${error.message}`);
      }
    });
}
console.log(getIDofMovies());
