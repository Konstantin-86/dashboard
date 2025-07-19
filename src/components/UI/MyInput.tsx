import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from '../../styles/UI/MyInput.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const MyInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = false, value, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          value={value ?? ""}
          className={`${styles.input} ${error ? styles.error : ''} ${className}`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

export default MyInput;
