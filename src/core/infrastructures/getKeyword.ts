import { spawnSync } from 'child_process';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';

// テキストからキーワードを抽出するPythonスクリプトのパス
const PYTHON_SCRIPT_PATH = '/Users/saku/Documents/moviefun-latest/src/core/infrastructures/my_nltk_script.py';

// TMDB APIの設定
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'x-api-key': env.REACT_APP_API_KEY,
  },
});

async function getKeywords(text: string): Promise<Array<string>> {
  // Pythonスクリプトを同期的に実行してキーワードを取得する
  const pythonProcess = await spawnSync('python', [PYTHON_SCRIPT_PATH], {
    input: text,
  });

  // Pythonスクリプトから出力されたキーワードを取得する
  const keywords = JSON.parse(pythonProcess.stdout.toString().replace(/'/g, '"'));
  return keywords;
}
// TMDBからキーワードIDを取得する
async function getKeywordId(keyword: string): Promise<number> {
  console.log(process.env.REACT_APP_API_KEY);

  const url = '/search/keyword' + '?api_key=' + process.env.REACT_APP_API_KEY + '&query=' + keyword + '&page=' + 1;
  const response = await axiosInstance.get(url);
  const keywordData = response.data.results[0];

  if (keywordData) {
    return keywordData.id;
  } else {
    return 0;
  }
}

export default async function getAllKeywordsIds(text: string): Promise<Array<number>> {
  const ids: Array<number> = [];
  const keywords = await getKeywords(text);
  Promise.all(
    keywords.map(async (keyword) => {
      ids.push(await getKeywordId(keyword));
    }),
  );
  console.log(ids);
  return ids;
}
getAllKeywordsIds('I want to feel beautiful and positive after watching it.');
