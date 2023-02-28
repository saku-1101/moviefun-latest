import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';
import nltk from 'nltk';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'x-api-key': env.API_KEY,
  },
});

const responseBody = (res: AxiosResponse) => {
  //   console.log(res);
  return res.data;
};

// afterEmotionのパラメータを返す
// 名詞と形容詞を抽出する関数
function extractKeywords(text: string) {
  const tokens = nltk.word_tokenize(text);
  const tagged = nltk.pos_tag(tokens);
  const keywords = [];
  for (const [word, tag] of tagged) {
    if (tag.startsWith('NN') || tag.startsWith('JJ')) {
      keywords.push(word);
    }
  }
  return keywords;
}

// テキストデータからキーワードを抽出
async function getKeywords(): Promise<Array<string>> {
  const textData = 'Introverted';
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
