import useTheme from './hooks/UseTheme';
import { FaLightbulb, FaUserAlt, FaCrown } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import { useState } from 'react';

const Header = () => {
  const { toggleTheme } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <header className={styles.header}>
      <button className={styles.theme} onClick={toggleTheme}>
        <FaLightbulb style={{ color: 'var(--text-color)' }} size={30} />
      </button>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? (
          <FaUserAlt style={{ color: 'var(--text-secondary)' }} size={30} />
        ) : (
          <FaCrown style={{ color: 'var(--aside-accent)' }} size={30} />
        )}
      </button>
    </header>
  );
};

export default Header;
