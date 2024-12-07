import * as React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// MapProps: このコンポーネントが受け取る緯度、経度、お店情報を示す型を定義
interface MapProps {
  latitude: number;
  longitude: number;
  restaurants: any[];
  hasSearchResult: boolean;
  onMarkerClick?: (restaurantId: string) => void; 
}

// Mapコンポーネント: Google Mapsを表示するためのコンポーネントを定義
const Map: React.FC<MapProps> = ({ latitude, longitude, restaurants, hasSearchResult, onMarkerClick }) => {
  // 地図のロード状態を管理
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [selectedMarkerId, setSelectedMarkerId] = React.useState<string | null>(null);
  
  // 地図の表示スタイルを定義
  const unserarchedMapStyle = {
    width: '100%',
    height: '100vh',  // 画面全体の高さに
    position: 'relative' as const, //リテラルタイプ
  };

  const serarchedMapStyle = {
    width: '100%',
    height: '60vh',  // 画面の高さを短く
    position: 'relative' as const, //リテラルタイプ
  };

  // 地図のインスタンスを保持するため
  const mapRef = React.useRef<google.maps.Map | null>(null);
  
  // 地図の中心となる位置情報を定義
  const center = {
    lat: latitude,
    lng: longitude,
  };

  // 地図の表示範囲を更新する関数
  const adjustMapBounds = React.useCallback(() => {
    if (!mapRef.current || !hasSearchResult || !restaurants || restaurants.length === 0 || !isLoaded) return;

    const bounds = new google.maps.LatLngBounds();
    
    // 現在地を追加
    bounds.extend({ lat: latitude, lng: longitude });
    
    // 店舗の位置を追加
    restaurants.forEach(restaurant => {
      if (restaurant.lat && restaurant.lng) {
        bounds.extend({ 
          lat: Number(restaurant.lat), 
          lng: Number(restaurant.lng) 
        });
      }
    });

    // 境界を設定してから、少しズームアウト
    mapRef.current.fitBounds(bounds);

    // 少し待ってから中心位置とズームを調整
    setTimeout(() => {
      if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        if (currentZoom) {
          mapRef.current.setZoom(currentZoom);
        }
      }
    }, 100);
  }, [hasSearchResult, restaurants, latitude, longitude, isLoaded]);

  // 地図がロードされた時の処理
  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setIsLoaded(true);
  }, []);

  // 検索結果や位置情報が変更された時に地図の表示範囲を更新
  React.useEffect(() => {
    if (mapRef.current && isLoaded && hasSearchResult) {
      // 初回表示時とレストラン検索結果が変更された時のみ実行
      const timeoutId = setTimeout(() => {
        adjustMapBounds();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [restaurants, hasSearchResult, isLoaded]);

  // マーカークリックのハンドラー
  const handleMarkerClick = (restaurantId: string) => {
    console.log('クリックされているマーカー:', restaurantId);
    setSelectedMarkerId(restaurantId);
    if (onMarkerClick) {
      onMarkerClick(restaurantId);
    }
  };

  // マーカーのサイズを取得する関数
  const getMarkerSize = (restaurantId: string) => {
    return selectedMarkerId === restaurantId ? 50 : 40; // 選択されたマーカーは大きく
  };

  // 地図クリック時に選択を解除
  const handleMapClick = () => {
    setSelectedMarkerId(null);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={hasSearchResult ? serarchedMapStyle : unserarchedMapStyle}
        center={center}
        zoom={16}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
        }}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {/* 現在地のマーカー */}
        <Marker position={center} />
        
        {/* レストランのマーカー */}
        {isLoaded && restaurants && Array.isArray(restaurants) && restaurants.map((restaurant, index) => (
          restaurant.lat && restaurant.lng && (
            <Marker 
              key={index} 
              position={{ 
                lat: Number(restaurant.lat), 
                lng: Number(restaurant.lng) 
              }}
              icon={{
                url: '/assets/image/marker.png',
                scaledSize: isLoaded ? new window.google.maps.Size(
                  getMarkerSize(restaurant.id),
                  getMarkerSize(restaurant.id)
                ) : undefined
              }}
              onClick={() => handleMarkerClick(restaurant.id)}
              zIndex={selectedMarkerId === restaurant.id ? 1000 : 1} 
            />
          )
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;