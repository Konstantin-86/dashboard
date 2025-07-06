import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import { FaTimesCircle } from "react-icons/fa";

import styles from "../../styles/Header/SingIn.module.css";

interface SingInProps {
    setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SingIn: React.FC<SingInProps> = ({ setShowSignIn, setIsLoggedIn }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Пожалуйста, заполните все поля');
            setTimeout(() => {
                setError("");
            }, 1500);
            return;
        }
        setLoading(true);
        setError("");
        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (authError) {
                throw authError;

            } else {
                setShowSignIn(false);
                setIsLoggedIn(true);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка авторизации. Проверьте email и пароль.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className={styles.inner}>
                <form className={styles.form}>

                    <div className={styles.close} onClick={() => setShowSignIn(false)}> <FaTimesCircle size={30} /></div>
                    <MyInput
                        label="Логин"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <MyInput
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />

                    <div className={styles.error}>
                        {error}
                    </div>

                    <MyButton variant="accent" onClick={handleLogin}>{loading ? 'Думаю...' : 'Войти'}</MyButton>
                </form>
            </div>
        </>
    )
}

export default SingIn