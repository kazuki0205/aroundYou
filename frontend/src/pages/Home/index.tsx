import * as React from "react";
import { useGeolocated } from 'react-geolocated';
import GeolocationStatus from '../../components/GeolocationStatus'; // GeolocationStatusコンポーネントをインポート
import TextInput from '../../components/TextInput'; // InputTextコンポーネントをインポート
import styles from './style.module.scss'; // SCSSモジュールをインポート
import useSearch from "./hooks";
import { IconButton } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation'; // ナビゲーションアイコンをインポート
import { searchRestrauntApi } from '../../api/searchRestrauntApi'; // ナビゲーションアイコンをインポート
import Map from '../../components/Map'; // Mapコンポーネントをインポート


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
  
  // useSearchフックを使用して検索の状態を管理
  const {
    searchValue,
    setSearchValue,
    handleSearch,
    handleReset,
  } = useSearch();

  // 店舗情報の状態管理
  const [restaurants, setRestaurants] = React.useState<any[]>([]);

  // 検索確定処理
  const handleSearchWithMap = async () => {
    if (coords) {
    const { latitude, longitude } = coords;
    try {
        // 現在地の緯度・経度と検索キーワードを使って、近くの店舗情報を取得
        const fetchedRestaurants = await searchRestrauntApi(latitude, longitude, searchValue);
        
        // 取得した店舗情報を状態にセット
        setRestaurants(fetchedRestaurants);
    } catch (error) {
        console.error('検索に失敗しました:', error);
    }
    } else {
    // 現在地の情報が取得できていない場合にエラーメッセージを表示
    alert('現在地情報が取得できていません。もう一度位置情報を取得してください。');
    }
};

  return (
    <div>
      {/* <h1 className={styles.title}>現在地を表示</h1> */}
      {/* 検索フィールドを表示 */}
      <TextInput
        value={searchValue} //現在の検索範囲
        onChange={(value) => setSearchValue(value)} //入力されて変更されたときの状態関係
        onSearch={handleSearchWithMap} // 検索ボタンが押されたときの処理
        onReset={handleReset} // リセットボタンが押されたときの処理
        placeholder="検索キーワードを入力"
      />

      {/* GeolocationStatusコンポーネントに必要な情報を渡す */}
      <GeolocationStatus
        coords={coords ? { latitude: coords.latitude, longitude: coords.longitude } : null}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
      />

      {/* Mapコンポーネントを表示 */}
      {coords && (
        <Map 
            latitude={coords.latitude}
            longitude={coords.longitude}
            restaurants={restaurants}
        />
      )}

      {/* 位置情報を手動で再取得するボタン */}
      <IconButton onClick={getPosition} className={styles.locationButton} color="primary">
        <NavigationIcon />
      </IconButton>
    </div>
  );
};

export default Home;