import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';
import { spawn } from 'child_process';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

const responseBody = (res: AxiosResponse) => {
  return res.data;
};

function tokenize(text: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    // creation of a process by a parent process.
    const python = spawn('python', [
      '/Users/saku/Documents/moviefun-latest/src/core/infrastructures/getKeyword.js',
      text,
    ]);

    let tokens: string[] = [];
    let error: Error | null = null;
    python.stdout.on('data', (data) => {
      console.log(data);
      tokens = data.toString().trim().split(' ');
    });

    python.stderr.on('data', (data) => {
      console.log(data);
      error = new Error(data.toString());
    });

    python.on('close', () => {
      if (error) {
        reject(error);
      } else {
        resolve(tokens);
      }
    });
  });
}

// afterEmotionのパラメータを返す
// 名詞と形容詞を抽出する関数
async function extractKeywords(text: string) {
  console.log('here');
  const tagged = await tokenize(text);
  const keywords = [];
  for (const word of tagged) {
    if (word[1].startsWith('NN') || word[1].startsWith('JJ')) {
      keywords.push(word[0]);
    }
  }
  return keywords;
}

// テキストデータからキーワードを抽出
async function getKeywords(): Promise<Array<string>> {
  const textData = 'I like to eat pizza';
  const keywords = extractKeywords(textData);
  console.log(keywords);
  return keywords;
}
// テキストデータに基づくTMDBのキーワードを抽出
async function getKeywordIDs(keywords: Array<string>): Promise<Array<number>> {
  const keywordIds: number[] = [];
  for (const keyword of keywords) {
    // TMDBのキーワード検索APIにキーワードを渡して、検索結果の最初のもののIDを取得
    const res = await axiosInstance.get(`/search/keyword`, {
      params: {
        api_key: env.API_KEY,
        query: keyword,
      },
    });
    const results = res.data.results;
    if (results.length > 0) {
      keywordIds.push(results[0].id);
    }
  }
  return keywordIds;
}

getKeywords().then((res) => {
  console.log(res);
  getKeywordIDs(res);
});
