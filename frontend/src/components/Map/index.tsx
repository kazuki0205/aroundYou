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

// Mapコンポーネント: Google Mapsを表示するためのコンポーネントを定義
const Map: React.FC<MapProps> = ({ latitude, longitude, restaurants }) => {
  // 地図の中心となる位置情報を定義
  const center = {
    lat: latitude,
    lng: longitude,
  };

 // APIキーが存在しない場合のエラー表示
 const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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
        zoom={16} // 地図の拡大率を設定
      >
        {/* 現在地を示すマーカー */}
        <Marker position={center} />
        {/* 各店舗のマーカーを表示 */}
        {restaurants && Array.isArray(restaurants) && restaurants.map((restaurant, index) => (
          restaurant.lat && restaurant.lng && ( // 緯度経度が存在することもチェック
            <Marker 
                key={index} 
                position={{ lat: Number(restaurant.lat), lng: Number(restaurant.lng) }}
                icon={{
                    url: '/assets/image/marker.png',
                    scaledSize: new window.google.maps.Size(40, 40) // アイコンサイズの調整
                }}
            />
          )
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;