import StatsCircle from './StatsCircle';
import StatsTable from './StatsTable';

import styles from '../styles/Stats.module.css';

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
