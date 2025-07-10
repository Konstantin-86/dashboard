import { useState } from 'react';
import { useActiveComponent } from '../../store/activeComponent/activeComponent';
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
  { icon: <FaHome />, text: 'Главная' },
  { icon: <FaUsers />, text: 'Персонал' },
  { icon: <FaClipboardList />, text: 'Шаблоны' },
  { icon: <FaEnvelope />, text: 'Сообщения' },
];

const AsideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showItemList, setShowItemList] = useState(true);
  const { setActiveWidget } = useActiveComponent();

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
  const handleItemClick = (widget: string) => {
    switch (widget) {
      case 'Главная':
        setActiveWidget('mainTable');
        break;
      case 'Персонал':
        setActiveWidget('personals');
        break;
      case 'Шаблоны':
        setActiveWidget('templates');
        break;
      case 'Сообщения':
        setActiveWidget('messages');
        break;
      default:
        break;
    }
    setIsOpen(false);
    setShowItemList(false);
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
          <li key={index} className={styles.menuItem} onClick={() => handleItemClick(item.text)}>
            <span className={styles.icon}>{item.icon}</span>
            {showItemList && <span className={styles.text}>{item.text}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
