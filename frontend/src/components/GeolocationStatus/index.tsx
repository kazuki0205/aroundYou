import * as React from 'react';
import Map from '../Map';
import styles from './style.module.scss';

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
    return <div className={styles.errorMessage}>このブラウザは位置情報の取得をサポートしていません。</div>;
  } else if (!isGeolocationEnabled) {
    return <div className={styles.errorMessage}>位置情報サービスが有効になっていません。</div>;
  } else if (coords) {
    return <Map latitude={coords.latitude} longitude={coords.longitude} />;
  } else {
    return <div className={styles.loadingMessage}>位置情報を取得しています...</div>;
  }
};

export default GeolocationStatus;
