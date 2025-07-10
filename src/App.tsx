import { useActiveComponent } from './store/activeComponent/activeComponent';

import Header from './components/Header/Header';
import AsideMenu from './components/Aside/AsideMenu';
import MainPages from './pages/MainPages';
import Personals from './pages/Personals';
import Templates from './components/Templates/Templates';

import styles from './styles/App.module.css';

function App() {
  const { activeWidget } = useActiveComponent();

  return (
    <div className={styles.mainInner}>
      <AsideMenu />
      <Header />
      {activeWidget === 'mainTable' && <MainPages />}
      {activeWidget === 'personals' && <Personals />}
      {activeWidget === 'templates' && <Templates />}
    </div>
  );
}

export default App;
