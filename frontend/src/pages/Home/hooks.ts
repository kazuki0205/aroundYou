import { useState } from 'react';

// 検索に関する状態と処理をまとめたフック
const useSearch = () => {
  // 検索用の入力値の状態管理
  const [searchValue, setSearchValue] = useState('');

  // 検索確定処理
  const handleSearch = () => {
    console.log(searchValue + ' 検索されました！');
  };

  // 検索リセット処理
  const handleReset = () => {
    console.log('リセットされました！');
    setSearchValue('');
  };

  // フックとして返す値
  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleReset,
  };
};

export default useSearch;
