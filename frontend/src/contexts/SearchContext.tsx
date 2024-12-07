import React, { createContext, useContext, useState } from 'react';

// 店舗情報の型定義
interface Restaurant {
  id: string;
  name: string;      // 店舗名
  genre: string;     // ジャンル（ラーメン、居酒屋など）
  imageUrl: string;  // 店舗画像URL
  address: string;   // 住所情報
  distance: number;  // 現在地からの距離
  openingHours: string;  // 営業時間
  priceRange: string;    // 価格帯
  phone: string;         // 電話番号
  nearestStation: string; // 最寄り駅
  budget: string;        // 予算
  lat: string;          // 緯度
  lng: string;          // 経度
}

// 検索コンテキストの型定義
interface SearchContextType {
  searchValue: string;  // 検索キーワード
  setSearchValue: (value: string) => void;
  restaurants: Restaurant[];  // 検索結果の店舗リスト
  setRestaurants: (restaurants: Restaurant[]) => void;
  searchRange: number;  // 検索範囲
  setSearchRange: (range: number) => void;
  hasSearchResult: boolean;  // 検索結果の有無
  setHasSearchResult: (hasResult: boolean) => void;
  coords: { latitude: number; longitude: number } | null;  // 現在地の座標
  setCoords: (coords: { latitude: number; longitude: number } | null) => void;
}

// 検索コンテキストの作成
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// 検索コンテキストプロバイダーコンポーネント
export function SearchProvider({ children }: { children: React.ReactNode }) {
  // 各状態の初期化
  const [searchValue, setSearchValue] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchRange, setSearchRange] = useState(1);
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const value = {
    searchValue,
    setSearchValue,
    restaurants,
    setRestaurants,
    searchRange,
    setSearchRange,
    hasSearchResult,
    setHasSearchResult,
    coords,
    setCoords,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// カスタムフック: 検索コンテキストを使用するためのフック
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}