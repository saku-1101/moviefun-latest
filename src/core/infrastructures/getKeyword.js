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
var child_process_1 = require("child_process");
var axios_1 = require("axios");
var node_process_1 = require("node:process");
// テキストからキーワードを抽出するPythonスクリプトのパス
var PYTHON_SCRIPT_PATH = '/Users/saku/Documents/moviefun-latest/src/core/infrastructures/my_nltk_script.py';
// TMDB APIの設定
var axiosInstance = axios_1["default"].create({
    baseURL: 'https://api.themoviedb.org/3'
});
function getKeywords(text) {
    return __awaiter(this, void 0, void 0, function () {
        var pythonProcess, keywords;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, child_process_1.spawnSync)('python', [PYTHON_SCRIPT_PATH], {
                        input: text
                    })];
                case 1:
                    pythonProcess = _a.sent();
                    keywords = JSON.parse(pythonProcess.stdout.toString().replace(/'/g, '"'));
                    return [2 /*return*/, keywords];
            }
        });
    });
}
// TMDBからキーワードIDを取得する
function getKeywordId(keyword) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, keywordData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '/search/keyword' + '?api_key=' + node_process_1.env.API_KEY + '&query=' + keyword + '&page=' + 1;
                    return [4 /*yield*/, axiosInstance.get(url)];
                case 1:
                    response = _a.sent();
                    keywordData = response.data.results[0];
                    if (keywordData) {
                        return [2 /*return*/, keywordData.id];
                    }
                    else {
                        return [2 /*return*/, 0];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getAllKeywordsIds(text) {
    return __awaiter(this, void 0, void 0, function () {
        var ids, keywords, index, keyword, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ids = [];
                    return [4 /*yield*/, getKeywords(text)];
                case 1:
                    keywords = _c.sent();
                    index = 0;
                    _c.label = 2;
                case 2:
                    if (!(index < keywords.length)) return [3 /*break*/, 5];
                    keyword = keywords[index];
                    _b = (_a = ids).push;
                    return [4 /*yield*/, getKeywordId(keyword)];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 4;
                case 4:
                    index++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, ids];
            }
        });
    });
}
exports["default"] = getAllKeywordsIds;
getAllKeywordsIds('I want to feel beautiful and positive after watching it.').then(function (res) { return console.log(res); });
