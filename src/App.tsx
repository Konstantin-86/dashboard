import AsideMenu from './components/AsideMenu';
import Header from './components/Header/Header';
import SkeletonMain from './components/SkeletonMain';
import Stats from './components/Stats';

import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.mainInner}>
      <Header />
      <AsideMenu />
      <SkeletonMain />
      <Stats />
    </div>
  );
}

export default App;
