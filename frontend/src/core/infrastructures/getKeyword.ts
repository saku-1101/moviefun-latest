import { spawnSync } from 'child_process';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { env } from 'node:process';

// テキストからキーワードを抽出するPythonスクリプトのパス
const PYTHON_SCRIPT_PATH = '/Users/saku/Documents/moviefun-latest/src/core/infrastructures/my_nltk_script.py';

// TMDB APIの設定
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

async function getKeywords(text: string): Promise<Array<string>> {
  // Pythonスクリプトを同期的に実行してキーワードを取得する
  const pythonProcess = spawnSync('python', [PYTHON_SCRIPT_PATH], {
    input: text,
  });

  // Pythonスクリプトから出力されたキーワードを取得する
  const keywords = JSON.parse(pythonProcess.stdout.toString().replace(/'/g, '"'));
  return keywords;
}
// TMDBからキーワードIDを取得する
async function getKeywordId(keyword: string): Promise<number> {
  const endpoint = '/search/keyword';
  const response = await axiosInstance.get(endpoint, {
    params: {
      api_key: import.meta.env.VITE_API_KEY,
      query: keyword,
      page: '1',
    },
  });
  const keywordData = response.data.results[0];

  if (keywordData) {
    return keywordData.id;
  } else {
    return 0;
  }
}

export default async function getAllKeywordsIds(text: string): Promise<number[]> {
  const ids: Array<number> = [];
  const keywords = await getKeywords(text);
  for (let index = 0; index < keywords.length; index++) {
    const keyword = keywords[index];
    ids.push(await getKeywordId(keyword));
  }
  return ids;
}
// getAllKeywordsIds('I want to feel beautiful and positive after watching it.').then((res) => console.log(res));
