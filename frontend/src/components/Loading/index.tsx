import * as React from 'react';
import styles from './style.module.scss';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Loading;