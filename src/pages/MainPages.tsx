import Stats from '../components/Main/Stats';
import SkeletonMain from '../components/Main/SkeletonMain';

import styles from '../styles/Pages/MainPages.module.css';

const MainPages = () => {
  return (
    <div className={styles.container}>
      <SkeletonMain />
      <Stats />
    </div>
  );
};

export default MainPages;
