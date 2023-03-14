import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { env } from 'node:process';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const responseBody = (res: AxiosResponse) => {
  //   console.log(res);
  return res.data;
};

// function getTheatreMovies(): Promise<void> {
//   const date = new Date();
//   let year: string = date.getUTCFullYear().toString();
//   let month: string = (date.getUTCMonth() + 1).toString();
//   let day: string = date.getUTCDate().toString();
//   let query_lte = '';
//   let query_gte = '';
//   if (day.length == 1) {
//     day = '0' + day;
//   }
//   if (month.length == 1) {
//     month = '0' + month.toString();
//   }
//   query_lte = year + '-' + month + '-' + day;
//   if (parseInt(month) - 1 < 1) {
//     year = (parseInt(year) - 1).toString();
//     month = (12 - (parseInt(month) - 1)).toString();
//   }
//   query_gte = year + '-' + month + '-' + day;
//   const endpoint = '/discover/movie';
//   //   What movies are in theatres?
//   // URL: /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
//   // const query_1: string =
//   //   '&primary_release_date.gte=' + query_gte + '&primary_release_date.lte=' + query_lte + '&with_release_type=2%7C3'; // １ヶ月前〜今日
//   return axiosInstance
//     .get(endpoint, {
//       params: {
//         api_key: import.meta.env.VITE_API_KEY,
//         region: 'JP|US',
//         language: 'ja-JA',
//         page: '1',
//         primary_release_date.gte: query_gte,
//         primary_release_date.lte: query_lte,
//         with_release_type: '2%7C3',
//         sort_by: 'popularity.desc',
//       }
//     })
//     .then(responseBody)
//     .catch((err) => {
//       console.log(err);
//     });
// }

function getPopMovies(): Promise<void> {
  const endpoint = '/movie/popular';
  return axiosInstance
    .get(endpoint, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        region: 'JP|US',
        language: 'ja-JA',
        page: '1',
      },
    })
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
}

function getTopOfYear(): Promise<void> {
  const date: Date = new Date();
  const year: number = date.getUTCFullYear();
  const endpoint = '/discover/movie';
  return axiosInstance
    .get(endpoint, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        region: 'JP|US',
        language: 'ja-JA',
        page: '1',
        primary_release_year: (year - 1).toString(),
        sort_by: 'popularity.desc',
      },
    })
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
}

function searchMovie(input: string): Promise<void> {
  const endpoint = '/search/movie';
  return axiosInstance
    .get(endpoint, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query: input,
        language: 'ja-JA',
      },
    })
    .then(responseBody)
    .catch((err) => {
      console.log(err);
    });
  // 多分const urlでも大丈夫．．．
  // UIにインプットしてる時→関数は発火されていない
  // 関数発火時→新たなセッション．関数もなんでも一新される？
  // もし，urlにconstが使えなかったら変数をgetに直入れ
}

export default function getIDofMovies() {
  const endpoint = '/genre/movie/list';
  return axiosInstance
    .get(endpoint, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'ja-JA',
      },
    })
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
async function log() {
  console.log(await getIDofMovies());
}
// log();
// export default getIDofMovies;
