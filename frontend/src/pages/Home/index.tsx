import * as React from "react";
import { useGeolocated } from 'react-geolocated';
import GeolocationStatus from '../../components/GeolocationStatus'; // GeolocationStatusコンポーネントをインポート
import TextInput from '../../components/TextInput'; // InputTextコンポーネントをインポート
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
  
    // 検索用の入力値と状態の管理
    const [searchValue, setSearchValue] = React.useState('');

    // 検索リセット処理
    const handleReset = () => {
        setSearchValue('');
    };


  return (
    <div>
      <h1 className={styles.title}>現在地を表示</h1>

      {/* 検索フィールドを表示 */}
      <TextInput
        value={searchValue} //現在の検索範囲
        onChange={(value) => setSearchValue(value)} //変更時の状態関係
        onReset={handleReset}
        placeholder="検索キーワードを入力"
      />

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