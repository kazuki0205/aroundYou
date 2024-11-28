import axios from "axios";

const HOTPEPPER_API_URL = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
const API_KEY = import.meta.env.REACT_APP_HOTPEPPER_API_KEY; //ホットペッパーのAPIキーを代入

// 仮に現在地から300mの範囲を検索する

export const searchRestrauntApi = async (lat: number, lng: number, keyword: string) => {
    try {
      const response = await axios.get(HOTPEPPER_API_URL, {
        params: {
          key: API_KEY, // APIキー
          lat: lat, // 緯度
          lng: lng, // 経度
          range: 1, // 検索範囲 (1: 300m / 2: 500m / 3: 1000m (初期値) / 4: 2000m / 5: 3000m
          keyword: keyword, // キーワード　店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。
          format: 'json', // レスポンス形式 json
        },
      });
      return response.data.results.restaurant;
    } catch (error) {
      console.error('近くの店舗を取得できませんでした。', error);
      return [];
    }
  };