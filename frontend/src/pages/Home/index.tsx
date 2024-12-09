import * as React from 'react';
import { useGeolocated } from 'react-geolocated';
import GeolocationStatus from '../../components/GeolocationStatus'; // GeolocationStatusコンポーネントをインポート
import TextInput from '../../components/TextInput'; // TextInputコンポーネントをインポート
import useLocalSearch from './hooks';
import { Container, Box, Fab, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation'; // ナビゲーションアイコンをインポート
import { searchRestrauntApi } from '../../api/searchRestrauntApi'; // APIをインポート
import Map from '../../components/Map'; // Mapコンポーネントをインポート
import RangeButton from '../../components/Button'; // Buttonコンポーネントをインポート
import RestaurantCard from '../../components/Card'; // Cardコンポーネントをインポート
import styles from './style.module.scss';
import { calculateDistance } from '../../utils/distance';
import { useSearch } from '../../contexts/SearchContext';
import Loading from '../../components/Loading'; // Loadingコンポーネントをインポート
import Pager from '../../components/Pager'; // Pagerコンポーネントをインポート
import Splash from '../../components/Splash'; //Splashコンポーネントをインポート
import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  // useGeolocatedフックを使用して現在地を取得
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true, // 高精度位置情報を取得
      },
      userDecisionTimeout: 5000, // ユーザーの許可を待つ時間（ミリ秒）
    });

  const location = useLocation();

  // useSearchフックを使用して検索の状態を管理
  const { searchValue, setSearchValue, handleReset } = useLocalSearch();
  const [isInitialLoading, setIsInitialLoading] = React.useState(location.state?.skipSplash ? false : true); // 初期ローディング
  const [isLoading, setIsLoading] = React.useState(false); // 検索時のローディング
  
  // グローバル状態の取得
  const {
    restaurants,
    setRestaurants,
    searchRange,
    setSearchRange,
    hasSearchResult,
    setHasSearchResult
  } = useSearch();

  React.useEffect(() => {
    if (coords && !location.state?.skipSplash) {
      // 位置情報取得後、少し遅延を入れてスプラッシュ画面を非表示に
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 2000); // 1秒後に非表示
    }
  }, [coords, location.state?.skipSplash]); 

  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 10; // 1ページあたりの表示件数

  const paginatedRestaurants = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return restaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [restaurants, currentPage]);

   // ページ変更時のハンドラー
    const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ上部へスムーズにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 検索確定処理
  const handleSearchWithMap = async () => {
    if (coords) {
      const { latitude, longitude } = coords;
      try {
        setIsLoading(true); 
        setCurrentPage(1);
        // 現在地の緯度・経度と検索キーワードを使って、近くの店舗情報を取得
        const fetchedRestaurants = await searchRestrauntApi(
          latitude,
          longitude,
          searchValue,
          searchRange,
        );
  
        // 店舗ごとの距離を計算
        const restaurantsWithDistance = fetchedRestaurants
          .map((restaurant: any) => {
            const restaurantLat = parseFloat(restaurant.lat || '0');
            const restaurantLng = parseFloat(restaurant.lng || '0');
  
            if (restaurantLat === 0 || restaurantLng === 0) {
              return null; // 無効なデータを除外
            }
  
            return {
              ...restaurant,
              distance: calculateDistance(latitude, longitude, restaurantLat, restaurantLng),
            };
          })
  
        // 結果を状態にセット
        setRestaurants(restaurantsWithDistance);
        setHasSearchResult(true);
      } catch (error) {
        console.error('検索に失敗しました:', error);
        setHasSearchResult(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      // 現在地の情報が取得できていない場合にエラーメッセージを表示
      // alert('現在地情報が取得できていません。もう一度位置情報を取得してください。');
    }
  };


  // useEffectを使用して検索範囲が変更されたときに自動的に検索を行う
  React.useEffect(() => {
    if (searchValue) {
      handleSearchWithMap();
    }
  }, [searchRange]);

  // 検索範囲が変更された時の処理
  const handleRangeChange = (range: number) => {
    setSearchRange(range); // 選択された範囲をstateに保存
  };

  const handleResetWithMap = () => {
  handleReset();
  setCurrentPage(1);
  setRestaurants([]);
  setHasSearchResult(false);
};

  // マーカークリック時のハンドラー
  const handleMarkerClick = (restaurantId: string) => {
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    if (restaurantIndex === -1) return;

      // 該当の店舗が含まれるページを計算
    const targetPage = Math.floor(restaurantIndex / ITEMS_PER_PAGE) + 1;

    // ページを更新
    setCurrentPage(targetPage);

    // 少し遅延を入れてスクロール（ページ更新後のDOMの更新を待つ）
    setTimeout(() => {
      const element = document.getElementById(`restaurant-${restaurantId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
  
        // カードのハイライト表示
        element.style.transition = 'background-color 0.3s';
        element.style.backgroundColor = '#c7c7c7';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1800);
      }
    }, 100);
  };

  return (
    <Box className={styles.mainContainer}>
      <Splash isVisible={isInitialLoading} />
      <Loading isLoading={isLoading} />
      {/* 検索UI */}
      <Container maxWidth="md" className={styles.searchUI}>
        <TextInput
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          onSearch={handleSearchWithMap}
          onReset={handleResetWithMap}
          placeholder="検索キーワードを入力"
        />

        <GeolocationStatus
          coords={coords ? { latitude: coords.latitude, longitude: coords.longitude } : null}
          isGeolocationAvailable={isGeolocationAvailable}
          isGeolocationEnabled={isGeolocationEnabled}
        />
      </Container>

      {/* 地図エリア */}
      {coords && (
        <Box className={`${styles.mapContainer} ${hasSearchResult ? styles.hasResults : ''}`}>
          <Map
            latitude={coords.latitude}
            longitude={coords.longitude}
            restaurants={restaurants}
            hasSearchResult={hasSearchResult} 
            onMarkerClick={handleMarkerClick} 
          />
        </Box>
      )}

      {/* 範囲選択ボタン */}
      {hasSearchResult && (
        <Box className={styles.optionalButtons}>
          <RangeButton
            onRangeChange={handleRangeChange}
            currentRange={searchRange}
            isVisible={hasSearchResult}
          />
          {/* 位置情報再取得ボタン */}
          <Fab
            color="primary"
            onClick={getPosition}
            className={styles.locationButton}
          >
            <NavigationIcon />
          </Fab>
        </Box>
      )}

      {/* 検索結果カード */}
      {hasSearchResult && (
        <Box className={styles.searchResults}>
          <Typography className={styles.resultsTitle} variant="subtitle2">
            検索結果: {restaurants.length}件
          </Typography>

          {paginatedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              genre={restaurant.genre}
              imageUrl={restaurant.imageUrl}
              address={restaurant.address}
              distance={restaurant.distance}
              openingHours={restaurant.openingHours}
              priceRange={restaurant.priceRange}
              phone={restaurant.phone}
              nearestStation={restaurant.nearestStation}
              budget={restaurant.budget}
            />
          ))}
          {restaurants.length > ITEMS_PER_PAGE && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <Pager
                current={currentPage}
                lastPage={Math.ceil(restaurants.length / ITEMS_PER_PAGE)}
                onChangePage={handlePageChange}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;