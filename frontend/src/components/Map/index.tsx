import * as React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


// MapProps: このコンポーネントが受け取る緯度と経度を示す型を定義
type MapProps = {
    latitude: number;
    longitude: number;
}

// 地図の表示スタイルを設定する定数
const mapContainerStyle = {
    width: '100%',
    height: '600px',
};

 // APIキーが存在するかチェック
console.log('Google Maps API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

// Mapコンポーネント: Google Mapsを表示するためのコンポーネントを定義
const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
    // 地図の中心となる位置情報を定義
    const center = {
        lat: latitude,
        lng: longitude,
    };

    return (
        // LoadScript: Google Maps APIを読み込むためのコンポーネント
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {/* GoogleMap: Googleの地図を表示するコンポーネント */}
        <GoogleMap
            mapContainerStyle={mapContainerStyle} // 地図のサイズを指定
            center={center} // 地図の中心の位置を設定
            zoom={14} // 地図の拡大率を設定
        >
            {/* Marker: 地図上にピン（マーカー）を立てるコンポーネント */}
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    );
};

export default Map;