import * as React from 'react';

// 位置情報の型定義
type Coordinates = {
  latitude: number; // 緯度
  longitude: number; // 経度
} | null;

// GeolocationStatus コンポーネントのプロパティ型
type GeolocationStatusProps = {
  coords: Coordinates; //位置情報の経緯度
  isGeolocationAvailable: boolean; //Geolocation API が利用可能かどうかを示すフラグ
  isGeolocationEnabled: boolean; //ユーザーが位置情報の取得を許可しているかどうかを示すフラグ
};

const GeolocationStatus: React.FC<GeolocationStatusProps> = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled,
}) => {

  // 位置情報取得に関する状態に応じて表示
  if (!isGeolocationAvailable) {
    console.error('このブラウザは位置情報の取得をサポートしていません。');
    return null;
  } else if (!isGeolocationEnabled) {
    console.log('位置情報サービスが有効になっていません。');
    return null;
  } else if (coords) {
    console.log('位置情報を取得しました。');
    return null;
  } else {
    console.log('位置情報を取得しています...');
    return null;
  }
};

export default GeolocationStatus;
