import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from 'node:process';
// import Movie from '../domains/models/movie.interface'

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

// parameter:
// afterEmotion: 映画を見終わった後になりたい気持ちをセンテンスで入力
// interest: 興味のあるジャンルを選択
// character:
function getRecommendationByEmotion(afterEmotion: Array<number>, interest: number, character: Array<number>) {}

// 性格からキーワードを抽出する
// 日本語で入力された性格をGoogle Translate APIで英語に置き換える
// 英訳された性格をキーワード取得関数になげる
// 無料枠を超えないように：入力文字数制限をする．日本語が検知された場合はAPIを使わない
// "なるべく日本語での入力にご協力お願いします"
