import { useCurrentPVZ } from '../../store/currentPVZ/currentPVZ';
import type { TCurrentPVZ } from '../../types/types';
import styles from '../../styles/Header/CurrentPVZ.module.css';

const CurrentPVZ = () => {
  const { currentPVZ, setCurrentPVZ } = useCurrentPVZ();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPVZ(e.target.value as TCurrentPVZ);
  };

  return (
    <div className={styles.container}>
      <select value={currentPVZ} onChange={handleChange} className={styles.select}>
        <option value="PVZ1">Новотроицк 26</option>
        <option value="PVZ2">Новотроицк 42</option>
        <option value="PVZ3">Новотроицк 48</option>
      </select>
    </div>
  );
};

export default CurrentPVZ;
