import * as React from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface PagerProps {
  current: number;
  lastPage: number;
  onChangePage: (page: number) => void;
}

const PageNumber: React.FC<{
  number: number;
  selected: boolean;
  current: boolean;
  last?: boolean;
  onClick: (page: number) => void;
}> = ({ number, selected, current, last, onClick }) => (
  <div
    className={cn(styles.pageNumber, {
      [styles.selected]: selected,
      [styles.current]: current,
      [styles.last]: last,
    })}
    onClick={() => onClick(number)}
  >
    {number}
  </div>
);

const ThreePoint = () => <div className={styles.threePoint}>...</div>;

const Pager: React.FC<PagerProps> = ({ current, lastPage, onChangePage }) => {
  if (lastPage <= 1) return null;

  const handleNext = () => {
    if (current < lastPage) onChangePage(current + 1);
  };

  const handlePrev = () => {
    if (current > 1) onChangePage(current - 1);
  };

  // 5ページ以下の場合
  if (lastPage <= 5) {
    return (
      <div className={styles.pagerContainer}>
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <PageNumber
            key={page}
            number={page}
            selected={current === page}
            current={current === page}
            onClick={onChangePage}
          />
        ))}
      </div>
    );
  }

  // 標準的なページャー表示（5ページより多い場合）
  return (
    <div className={styles.pagerContainer}>
      {/* 前へボタン */}
      {current > 1 && (
        <div className={styles.arrowButton} onClick={handlePrev}>
          ←
        </div>
      )}

      {/* 最初のページ */}
      <PageNumber
        number={1}
        selected={current === 1}
        current={current === 1}
        onClick={onChangePage}
      />

      {/* 省略記号（最初） */}
      {current > 3 && <ThreePoint />}

      {/* 現在のページの前後 */}
      {current > 2 && (
        <PageNumber
          number={current - 1}
          selected={false}
          current={false}
          onClick={onChangePage}
        />
      )}
      {current !== 1 && current !== lastPage && (
        <PageNumber
          number={current}
          selected={true}
          current={true}
          onClick={onChangePage}
        />
      )}
      {current < lastPage - 1 && (
        <PageNumber
          number={current + 1}
          selected={false}
          current={false}
          onClick={onChangePage}
        />
      )}

      {/* 省略記号（最後） */}
      {current < lastPage - 2 && <ThreePoint />}

      {/* 最後のページ */}
      {lastPage !== current && (
        <PageNumber
          number={lastPage}
          selected={current === lastPage}
          current={current === lastPage}
          onClick={onChangePage}
        />
      )}

      {/* 次へボタン */}
      {current < lastPage && (
        <div className={styles.arrowButton} onClick={handleNext}>
          →
        </div>
      )}
    </div>
  );
};

export default Pager;