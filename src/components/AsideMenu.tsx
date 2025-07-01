import  { useState } from 'react';
import { FaHome, FaUser, FaCog, FaEnvelope, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import styles from '../styles/AsideMenu.module.css';


const menuItems = [
  { icon: <FaHome />, text: 'Главная' },
  { icon: <FaUser />, text: 'Профиль' },
  { icon: <FaCog />, text: 'Настройки' },
  { icon: <FaEnvelope />, text: 'Сообщения' },
];

const AsideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`${styles.aside} ${isOpen ? styles.open : styles.closed}`}>
      <button className={isOpen ? styles.toggleButton : styles.toggleButtonClose} onClick={toggleMenu}>
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <span className={styles.icon}>{item.icon}</span>
            {isOpen && <span className={styles.text}>{item.text}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
