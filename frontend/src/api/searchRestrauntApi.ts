import axios from 'axios';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const searchRestrauntApi = async (
  lat: number,
  lng: number,
  keyword: string,
  range: number,
) => {
  try {
    // バックエンドAPIにリクエストを送信
    const response = await axios.get(`${BACKEND_API_URL}/api/hotpepper`, {
      params: {
        lat: lat, // 緯度
        lng: lng, // 経度
        range, // 検索範囲 (1: 300m / 2: 500m / 3: 1000m (初期値) / 4: 2000m / 5: 3000m
        keyword: keyword, // キーワード　店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。
        format: 'json', // レスポンス形式 json
      },
    });

    // データが正しく取得できたか確認し、取得したshopデータを加工して返す
    const shops = response.data.results.shop.map((shop: any) => ({
      id: shop.id,
      name: shop.name,
      genre: shop.genre.name,
      lat: parseFloat(shop.lat),
      lng: parseFloat(shop.lng),
      address: shop.address,
      catchCopy: shop.catch,
      imageUrl: shop.photo.mobile.l,
    }));

    return shops;
  } catch (error) {
    console.error('近くの店舗を取得できませんでした。', error);
    return []; // エラー時は空配列を返す
  }
};
