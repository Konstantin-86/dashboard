import useTheme from '../hooks/UseTheme';
import { FaLightbulb } from 'react-icons/fa';

const Theme = () => {
  const { toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      <FaLightbulb style={{ color: 'var(--text-color)' }} size={30} />
    </button>
  );
};

export default Theme;
