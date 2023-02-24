"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var node_process_1 = require("node:process");
var axiosInstance = axios_1["default"].create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'x-api-key': node_process_1.env.API_KEY
    }
});
console.log(node_process_1.env.API_KEY);
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
        .then(function (res) {
        console.log(res);
    })["catch"](function (err) {
        console.log(err);
    });
}
getTheatreMovies();
