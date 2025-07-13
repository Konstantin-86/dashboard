import Skeleton from 'react-loading-skeleton';
import styles from '../../styles/Personals/PersonSkeleton.module.css';
const PersonSkeleton = () => {
  const skelArr = Array(8).fill(null);
  return (
    <ul className={styles.list}>
      {skelArr.map((_, index) => {
        return (
          <li className={styles.item} key={index}>
            <Skeleton circle height={70} width={70} baseColor="var(--color-skeleton)" />
            <Skeleton height={40} width={200} baseColor="var(--color-skeleton)" />
          </li>
        );
      })}
    </ul>
  );
};

export default PersonSkeleton;
