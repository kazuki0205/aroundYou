import axios from "axios";

const  BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

// 仮に現在地から300mの範囲を検索する

export const searchRestrauntApi = async (lat: number, lng: number, keyword: string) => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/api/hotpepper`, {
        params: {
          lat: lat, // 緯度
          lng: lng, // 経度
          range: 1, // 検索範囲 (1: 300m / 2: 500m / 3: 1000m (初期値) / 4: 2000m / 5: 3000m
          keyword: keyword, // キーワード　店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。
          format: 'json', // レスポンス形式 json
        },
      });

        // データが正しく取得できたか確認し、取得したshopデータを加工して返す
      const shops = response.data.results.shop.map((shop: any) => ({
        id: shop.id,
        name: shop.name,
        lat: parseFloat(shop.lat),
        lng: parseFloat(shop.lng),
        address: shop.address,
      }));
  
      return shops;

    } catch (error) {
      console.error('近くの店舗を取得できませんでした。', error);
      return [];
    }
  };