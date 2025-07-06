import AsideMenu from './components/AsideMenu';
import Header from './components/Header/Header';
import { useActiveComponent } from './store/activeComponent/activeComponent';

import styles from './styles/App.module.css';
import MainPages from './pages/MainPages';
import Personals from './pages/Personals';

function App() {

  const { activeWidget } = useActiveComponent();

  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

  return (
    <div className={styles.mainInner}>
      <Header />
      <AsideMenu />
      {activeWidget === 'mainTable' && <MainPages />}
      {activeWidget === 'personals' && <Personals />}
    </div>
  );
}

export default App;
