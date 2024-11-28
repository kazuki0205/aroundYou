import * as React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// MapProps: このコンポーネントが受け取る緯度、経度、お店情報を示す型を定義
interface MapProps {
  latitude: number;
  longitude: number;
  restaurants: any[];
}

// 地図の表示スタイルを設定する定数
const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

// APIキーを代入し、代入できているかを確認
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log('Google Maps API Key:', googleMapsApiKey);

// Mapコンポーネント: Google Mapsを表示するためのコンポーネントを定義
const Map: React.FC<MapProps> = ({ latitude, longitude, restaurants }) => {
  // 地図の中心となる位置情報を定義
  const center = {
    lat: latitude,
    lng: longitude,
  };

  if (!googleMapsApiKey) {
    console.error("Google Maps API Key is missing or not provided.");
    return <div>Google Maps API Key is required to load the map.</div>;
  }

  return (
    // LoadScript: Google Maps APIを読み込むためのコンポーネント
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {/* GoogleMap: Googleの地図を表示するコンポーネント */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle} // 地図のサイズを指定
        center={center} // 地図の中心の位置を設定
        zoom={14} // 地図の拡大率を設定
      >
        {/* 現在地を示すマーカー */}
        <Marker position={center} />
        {/* 各店舗のマーカーを表示 */}
        {restaurants.map((restaurant, index) => (
          <Marker key={index} position={{ lat: restaurant.lat, lng: restaurant.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;