import * as React from 'react';
import styles from './style.module.scss';
import { TextField, Button } from '@mui/material';

//TextInputコンポーネントのプロパティを定義するためのPropsインターフェース
interface TextInputProps {
  value: string;
  onChange: (value: string) => void; // 入力値が変更されたときに呼び出される関数
  onReset?: () => void; //リセットボタンがクリックされたときに呼び出される関数
  onSearch?: (value: string) => void; //検索確定ボタンがクリックされたときに呼び出される関数
  placeholder?: string; //プレースホルダー(オプション)
  label?: string; //入力フィールドラベル
}

// TextInputの関数型コンポーネント
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onReset,
  onSearch,
  placeholder = '',
  label = '検索',
}) => {
  // 検索ボタンが押された時の動き
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value); // 現在の入力値を引数として渡す
    }
  };

  // 入力値が入力された時の動き
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); //新しい値でonChange関数を呼び出す
  };

  return (
    <div className={styles.inputTextWrapper}>
      {/* ユーザー入力用のTextFieldコンポーネント */}
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        fullWidth
        className={styles.input}
        sx={{ flex: 1 }}
      />

      {/* 検索確定ボタン、onSearchが送られてきている場合のみ表示 */}
      {onSearch && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick} // クリックされたときhandleSearchClick関数を呼び出す
          className={styles.searchButton}
          sx={{ height: 56 }}
        >
          検索
        </Button>
      )}

      {/* リセットボタン、onResetが送られてきている場合のみ表示 */}
      {onReset && (
        <Button
          variant="contained"
          color="warning"
          onClick={onReset}
          className={styles.resetButton}
          sx={{ height: 56 }}
        >
          リセット
        </Button>
      )}
    </div>
  );
};

export default TextInput;
