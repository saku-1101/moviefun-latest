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
var nltk_1 = require("nltk");
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
// afterEmotionのパラメータを返す
// 名詞と形容詞を抽出する関数
function extractKeywords(text) {
    var tokens = nltk_1["default"].word_tokenize(text);
    var tagged = nltk_1["default"].pos_tag(tokens);
    var keywords = [];
    for (var _i = 0, tagged_1 = tagged; _i < tagged_1.length; _i++) {
        var _a = tagged_1[_i], word = _a[0], tag = _a[1];
        if (tag.startsWith('NN') || tag.startsWith('JJ')) {
            keywords.push(word);
        }
    }
    return keywords;
}
// テキストデータからキーワードを抽出
function getKeywords() {
    return __awaiter(this, void 0, void 0, function () {
        var textData, keywords;
        return __generator(this, function (_a) {
            textData = 'Introverted';
            keywords = extractKeywords(textData);
            console.log(keywords);
            return [2 /*return*/, keywords];
        });
    });
}
// テキストデータに基づくTMDBのキーワードを抽出
function getKeywordIDs(keywords) {
    return __awaiter(this, void 0, void 0, function () {
        var keywordIds, _i, keywords_1, keyword, res, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keywordIds = [];
                    _i = 0, keywords_1 = keywords;
                    _a.label = 1;
                case 1:
                    if (!(_i < keywords_1.length)) return [3 /*break*/, 4];
                    keyword = keywords_1[_i];
                    return [4 /*yield*/, axiosInstance.get("/search/keyword", {
                            params: {
                                api_key: node_process_1.env.API_KEY,
                                query: keyword
                            }
                        })];
                case 2:
                    res = _a.sent();
                    results = res.data.results;
                    if (results.length > 0) {
                        keywordIds.push(results[0].id);
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, keywordIds];
            }
        });
    });
}
getKeywords().then(function (res) {
    console.log(res);
    getKeywordIDs(res);
});
