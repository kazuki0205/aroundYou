import * as React from 'react';
import styles from './style.module.scss';
import { TextField, Button } from '@mui/material';

//TextInputコンポーネントのプロパティを定義するためのPropsインターフェース
interface TextInputProps {
    value: string;
    onChange: (value: string) => void; // 入力値が変更されたときに呼び出される関数
    onReset?: () => void; //リセットボタンがクリックされたときに呼び出される関数
    placeholder?: string; //プレースホルダー(オプション)
    label?: string; //入力フィールドラベル
}

// TextInputの関数型コンポーネント
const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    onReset,
    placeholder = '',
    label = '検索',
}) => {

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
      />
      {/* リセットボタン、onResetが提供されている場合のみ表示 */}
      {onReset && (
        <Button
          variant="contained"
          color="warning"
          onClick={onReset}
          className={styles.resetButton}
        >
          検索リセットボタン
        </Button>
      )}
      
    </div>
  );
};

export default TextInput;
