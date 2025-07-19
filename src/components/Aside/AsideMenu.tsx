import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  FaHome,
  FaEnvelope,
  FaArrowLeft,
  FaArrowRight,
  FaUsers,
  FaClipboardList,
} from 'react-icons/fa';

import styles from '../../styles/Aside/AsideMenu.module.css';

const menuItems = [
  { icon: <FaHome />, path: '/', text: 'Главная' },
  { icon: <FaUsers />, path: 'personals', text: 'Персонал' },
  { icon: <FaClipboardList />, path: 'templates', text: 'Шаблоны' },
  { icon: <FaEnvelope />, path: 'messages', text: 'Сообщения' },
];

const AsideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showItemList, setShowItemList] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!showItemList) {
      setTimeout(() => {
        setShowItemList(!showItemList);
      }, 500);
    } else {
      setShowItemList(!showItemList);
    }
  };

  return (
    <aside className={`${styles.aside} ${isOpen ? styles.open : styles.closed}`}>
      <button
        className={isOpen ? styles.toggleButton : styles.toggleButtonClose}
        onClick={toggleMenu}
      >
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className={styles.menuItem}
            to={item.path}
            activeProps={{
              className: `${styles.menuItem} ${styles.activeMenuItem}`
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            {showItemList && <span className={styles.text}>{item.text}</span>}
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;