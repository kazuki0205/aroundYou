import * as React from 'react';
import styles from './style.module.scss';
import logo from '../../../public/assets/image/logo.png';

interface SplashProps {
  isVisible: boolean;
}

const Splash: React.FC<SplashProps> = ({ isVisible }) => {
    const [shouldRender, setShouldRender] = React.useState(isVisible);
  
    React.useEffect(() => {
      if (!isVisible) {
        // フェードアウトアニメーション完了後にコンポーネントを完全に削除
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, 2000); 
  
        return () => clearTimeout(timer);
      } else {
        setShouldRender(true);
      }
    }, [isVisible]);
  
    if (!shouldRender) return null;
  
    return (
      <div className={`${styles.splashContainer} ${!isVisible ? styles.fadeOut : ''}`}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
    );
  };
  
  export default Splash;