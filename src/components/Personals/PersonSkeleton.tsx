import Skeleton from 'react-loading-skeleton';
import styles from '../../styles/Personals/PersonSkeleton.module.css';
const PersonSkeleton = () => {
  const skelArr = Array(7).fill(null);
  return (
    <ul className={styles.list}>
      <button></button>
      {skelArr.map((_, index) => {
        return (
          <li className={styles.item} key={index}>
            <Skeleton circle height={50} width={50} baseColor="var(--text)" />
            <Skeleton height={30} width={250} baseColor="var(--text)" />
          </li>
        );
      })}
    </ul>
  );
};

export default PersonSkeleton;
