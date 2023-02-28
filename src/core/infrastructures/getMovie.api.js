"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    //   console.log(res);
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
function log() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = console).log;
                    return [4 /*yield*/, getIDofMovies()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
log();
