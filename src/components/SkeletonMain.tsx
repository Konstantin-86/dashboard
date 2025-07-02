import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../styles/SkeletonMain.module.css';
import { useActiveComponent } from '../store/activeComponent/activeComponent';
import { useEffect, useState } from 'react';

const SkeletonMain = () => {
  const [listMove, setListMove] = useState(false);
  const skelArr = Array(7).fill(null);
  const { activeWidget } = useActiveComponent();
  useEffect(() => {
    if (activeWidget === 'mainTable') {
      setListMove(true);
    } else {
      setListMove(false);
    }
  }, [activeWidget]);

  return (
    <ul className={`${styles.list} ${listMove ? styles.listMove : ''}`}>
      <button></button>
      {skelArr.map((_, index) => {
        return (
          <li className={styles.item} key={index}>
            <Skeleton circle height={50} width={50} baseColor="var(--text-secondary)" />
            <Skeleton height={30} width={250} baseColor="var(--text-secondary)" />
          </li>
        );
      })}
    </ul>
  );
};

export default SkeletonMain;
