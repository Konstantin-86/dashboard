import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './styles/MyButton.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'medium',
            fullWidth = false,
            loading = false,
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''
                    } ${loading ? styles.loading : ''} ${className}`}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading && <span className={styles.spinner}></span>}
                {children}
            </button>
        );
    }
);


export default MyButton;