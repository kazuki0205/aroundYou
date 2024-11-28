// server/server.ts
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// CORSを有効にする（フロントエンドからのリクエストを許可）
app.use(cors());

// ホットペッパーAPIのプロキシエンドポイント
app.get('/api/hotpepper', async (req, res) => {
  try {
    const { lat, lng, range, keyword } = req.query;
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {
        key: process.env.HOTPEPPER_API_KEY, // 環境変数からAPIキーを取得
        lat,
        lng,
        range,
        keyword,
        format: 'json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('APIリクエスト中にエラーが発生しました:', error);
    res.status(500).send('APIリクエスト中にエラーが発生しました');
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
