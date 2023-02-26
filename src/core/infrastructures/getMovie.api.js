"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var node_process_1 = require("node:process");
// import Movie from '../domains/models/movie.interface'
var axiosInstance = axios_1["default"].create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'x-api-key': node_process_1.env.API_KEY
    }
});
var responseBody = function (res) {
    console.log(res);
    return res.data;
};
function getTheatreMovies() {
    var date = new Date();
    var year = date.getUTCFullYear().toString();
    var month = (date.getUTCMonth() + 1).toString();
    var day = date.getUTCDate().toString();
    var query_lte = '';
    var query_gte = '';
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
    var endpoint = '/discover/movie';
    var query_1 = '&primary_release_date.gte=' + query_gte + '&primary_release_date.lte=' + query_lte + '&with_release_type=2%7C3'; // １ヶ月前〜今日
    var query_2 = '&sort_by=popularity.desc';
    var language = '&region=JP|US&language=ja-JA&page=1';
    var url = endpoint + '?api_key=' + node_process_1.env.API_KEY + language + query_1 + query_2;
    return axiosInstance
        .get(url)
        .then(responseBody)["catch"](function (err) {
        console.log(err);
    });
}
function getPopMovies() {
    var endpoint = '/movie/popular';
    var query = '&region=JP|US&language=ja-JA&page=1';
    var url = endpoint + '?api_key=' + node_process_1.env.API_KEY + query;
    return axiosInstance
        .get(url)
        .then(responseBody)["catch"](function (err) {
        console.log(err);
    });
}
function getTopOfYear() {
    var date = new Date();
    var year = date.getUTCFullYear();
    var endpoint = '/discover/movie';
    var query_1 = '&primary_release_year=';
    var query_2 = '&sort_by=popularity.desc';
    var language = '&region=JP|US&language=ja-JA&page=1';
    var url = endpoint + '?api_key=' + node_process_1.env.API_KEY + language + query_1 + (year - 1).toString() + query_2;
    return axiosInstance
        .get(url)
        .then(responseBody)["catch"](function (err) {
        console.log(err);
    });
}
function searchMovie(input) {
    var endpoint = '/search/movie';
    var language = '&language=ja-JA';
    var url = endpoint + '?api_key=' + node_process_1.env.API_KEY + '&query=' + input + language;
    return axiosInstance
        .get(url)
        .then(responseBody)["catch"](function (err) {
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
    var endpoint = '/genre/movie/list';
    var language = '&language=ja-JA';
    var url = endpoint + '?api_key=' + node_process_1.env.API_KEY + language;
    return axiosInstance
        .get(url)
        .then(responseBody)["catch"](function (error) {
        if (error.response) {
            console.error("Error: ".concat(error.response.status, " ").concat(error.response.statusText));
        }
        else if (error.request) {
            console.error('No response received');
        }
        else {
            console.error("Error: ".concat(error.message));
        }
    });
}
console.log(getIDofMovies());
