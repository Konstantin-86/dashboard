import StatsCircle from '../Main/StatsCircle';
import StatsTable from '../Main/StatsTable';

import styles from '../../styles/Main/Stats.module.css';

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
