import styles from '../styles/Stats.module.css';
import StatsCircle from './StatsCircle';
import StatsTable from './StatsTable';

const Stats = () => {
  return (
    <>
      <div className={styles.inner}>
        <StatsTable />
        <StatsCircle />
      </div>
    </>
  );
};

export default Stats;
