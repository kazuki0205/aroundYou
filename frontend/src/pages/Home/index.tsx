import * as React from "react";
import { useGeolocated } from 'react-geolocated';
import GeolocationStatus from '../../components/GeolocationStatus';
import styles from './style.module.scss'; // SCSSモジュールをインポート

const Home: React.FC = () => {
  // useGeolocatedフックを使用して現在地を取得
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true, // 高精度位置情報を取得
    },
    userDecisionTimeout: 5000, // ユーザーの許可を待つ時間（ミリ秒）
  });

  return (
    <div>
      <h1 className={styles.title}>現在地を表示</h1>

      {/* GeolocationStatusコンポーネントに必要な情報を渡す */}
      <GeolocationStatus
        coords={coords ? { latitude: coords.latitude, longitude: coords.longitude } : null}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
      />

      {/* 位置情報を手動で再取得するボタン */}
      <button onClick={getPosition} className={styles.locationButton}>
        位置情報を再取得
      </button>
    </div>
  );
};

export default Home;