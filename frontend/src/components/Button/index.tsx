import * as React from 'react';
import { Button as MuiButton, ButtonGroup } from '@mui/material';
import styles from './style.module.scss';

// 検索範囲ボタンの型定義
interface RangeButtonProps {
  onRangeChange: (range: number) => void; // 範囲が変更された時に呼び出される関数
  currentRange: number; // 現在選択されている範囲
  isVisible: boolean; // ボタンの表示/非表示を制御
}

const RangeButton: React.FC<RangeButtonProps> = ({
  onRangeChange,
  currentRange,
  isVisible,
}) => {
  // 表示条件をチェック
  if (!isVisible) return null;
  // 検索範囲ボタンの選択肢を定義
  const ranges = [
    { value: 1, label: '300m' }, // value: 検索範囲, label: ユーザーに表示するテキスト
    { value: 2, label: '500m' },
    { value: 4, label: '2000m' },
  ];

  return (
    <div className={styles.buttonContainer}>
      {/* Material UIのButtonGroupを使用して横並びのボタングループを作成 */}
      <ButtonGroup variant="contained">
        {ranges.map((range) => (
          <MuiButton
            key={range.value}
            onClick={() => onRangeChange(range.value)}
            // 現在選択されている範囲のボタンはprimaryカラー、それ以外は無色に
            color={currentRange === range.value ? 'primary' : 'inherit'}
          >
            {range.label}
          </MuiButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default RangeButton;
