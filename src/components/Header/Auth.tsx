import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import MyButton from '../UI/MyButton';
import { FaUser, FaUserShield } from 'react-icons/fa';
import SingIn from './SingIn';

import styles from '../../styles/Header/Auth.module.css';

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showLogOut, setShowLogOut] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Ошибка проверки сессии:', error);
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(!!session);
    };
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    setShowLogOut(false);
    if (error) console.error('Ошибка выхода:', error);
  };

  return (
    <>
      <div className={styles.container}>
        {isLoggedIn ? (
          <FaUserShield
            size={30}
            color="var(--aside-accent)"
            onClick={() => setShowLogOut(!showLogOut)}
          />
        ) : (
          <FaUser size={25} color="var(--bg-secondary)" onClick={() => setShowSignIn(true)} />
        )}

        {showLogOut && (
          <MyButton className={styles.button} onClick={handleLogout}>
            Выйти
          </MyButton>
        )}
        {showSignIn && <SingIn setShowSignIn={setShowSignIn} setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </>
  );
}
