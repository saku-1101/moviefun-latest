import { spawnSync } from 'child_process';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';

// テキストからキーワードを抽出するPythonスクリプトのパス
const PYTHON_SCRIPT_PATH = '/Users/saku/Documents/moviefun-latest/src/core/infrastructures/my_nltk_script.py';

// TMDB APIの設定
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});
// テキスト
const text = 'I want to feel beautiful and positive after watching it.';

// Pythonスクリプトを同期的に実行してキーワードを取得する
const pythonProcess = spawnSync('python', [PYTHON_SCRIPT_PATH], {
  input: text,
});

// Pythonスクリプトから出力されたキーワードを取得する
const keywords = JSON.parse(pythonProcess.stdout.toString().replace(/'/g, '"'));

// TMDBからキーワードIDを取得する
async function getKeywordId(keyword: string): Promise<any> {
  const url = '/search/keyword' + '?api_key=' + '874b2c31cd678740afe326baa8408862' + '&query=' + keyword + '&page=' + 1;
  const response = await axiosInstance.get(url);
  const keywordData = response.data.results[0];
  console.log(keywordData);

  if (keywordData) {
    // console.log(keywordData.id);
    return keywordData.id;
  } else {
    console.log(null);
    return null;
  }
}

console.log('here', keywords);
keywords.forEach((keyword: string) => {
  getKeywordId(keyword);
});
