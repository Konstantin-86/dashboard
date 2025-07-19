import CurrentPVZ from './CurrentPVZ';
import Theme from './Theme';
import Auth from './Auth';
import CurrentDate from './CurrentDate';

import styles from '../../styles/Header/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <CurrentDate />
      <CurrentPVZ />
      <Theme />
      <Auth />
    </header>
  );
};

export default Header;
