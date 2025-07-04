import { useState } from 'react';
import { FaUserAlt, FaCrown } from 'react-icons/fa';

const Auth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <button onClick={() => setIsAdmin(!isAdmin)}>
      {isAdmin ? (
        <FaUserAlt style={{ color: 'var(--text-secondary)' }} size={30} />
      ) : (
        <FaCrown style={{ color: 'var(--aside-accent)' }} size={30} />
      )}
    </button>
  );
};

export default Auth;
