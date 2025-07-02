import { useState } from 'react';
import { useActiveComponent } from '../store/activeComponent/activeComponent';
import { FaHome, FaUser, FaCog, FaEnvelope, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from '../styles/AsideMenu.module.css';

const menuItems = [
  { icon: <FaHome />, text: 'Главная' },
  { icon: <FaUser />, text: 'Профиль' },
  { icon: <FaCog />, text: 'Настройки' },
  { icon: <FaEnvelope />, text: 'Сообщения' },
];

const AsideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showItemList, setShowItemList] = useState(true);
  const { setActiveWidget } = useActiveComponent();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen === true) {
      setActiveWidget('mainTable');
    } else {
      setActiveWidget('asideMenu');
    }
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
          <li key={index} className={styles.menuItem}>
            <span className={styles.icon}>{item.icon}</span>
            {showItemList && <span className={styles.text}>{item.text}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
