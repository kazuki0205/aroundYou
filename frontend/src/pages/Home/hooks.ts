import { useSearch } from '../../contexts/SearchContext';

// 検索に関する状態と処理をまとめたフック
const useLocalSearch = () => {
  const { 
    searchValue, 
    setSearchValue,
    setRestaurants,
    setSearchRange,
    setHasSearchResult 
  } = useSearch();

  // 検索確定処理
  const handleSearch = () => {
    console.log(searchValue + ' 検索されました！');
  };

  // 検索リセット処理
  const handleReset = () => {
    console.log('リセットされました！');
    setSearchValue('');
    setRestaurants([]);  // 検索結果をクリア
    setSearchRange(1);   // 検索範囲を初期値に戻す
    setHasSearchResult(false); // 検索結果の表示状態をリセット
  };

  // フックとして返す値
  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleReset,
  };
};

export default useLocalSearch;