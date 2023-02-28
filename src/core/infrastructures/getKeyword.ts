import { MeCab } from 'mecab-client';
import axios from 'axios';

// TMDB APIキーとベースURL
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

// MeCabのインスタンスを生成
const mecab = new MeCab();

// テキストからキーワードを抽出する関数
async function extractKeywords(text: string): Promise<string[]> {
  // テキストを形態素解析
  const nodes = await mecab.parse(text);

  // 名詞、形容詞をキーワードとして抽出
  const keywords: string[] = [];
  for (const node of nodes) {
    const lexical = node.lexical;
    const surface = node.surface;
    // const pos = feature.split(',')[0];
    if (lexical === '名詞' || lexical === '形容詞') {
      keywords.push(surface);
    }
  }

  return keywords;
}

// キーワードからTMDBのキーワードIDを取得する関数
async function getKeywordIds(keywords: string[]): Promise<number[]> {
  const keywordIds: number[] = [];
  for (const keyword of keywords) {
    // TMDBのキーワード検索APIにキーワードを渡して、検索結果の最初のもののIDを取得
    const res = await axios.get(`${BASE_URL}/search/keyword`, {
      params: {
        api_key: API_KEY,
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

// テキストからキーワードを抽出し、TMDBのキーワードIDを取得する関数
async function extractKeywordsAndIds(text: string): Promise<number[]> {
  const keywords = await extractKeywords(text);
  const keywordIds = await getKeywordIds(keywords);
  console.log(keywordIds);
  return keywordIds;
}
extractKeywordsAndIds('内向的');
