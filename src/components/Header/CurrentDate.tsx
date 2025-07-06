import styles from '../../styles/Header/CurrentDate.module.css';

const CurrentDate = () => {
  const getFormattedDate = (): string => {
    const date = new Date();
    const weekdayOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
    };
    const dayOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    const weekday = date.toLocaleDateString('ru-RU', weekdayOptions);
    const dayMonthYear = date.toLocaleDateString('ru-RU', dayOptions);
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return `${capitalizedWeekday} ${dayMonthYear}`;
  };

  return <div className={styles.date}>{getFormattedDate()}</div>;
};

export default CurrentDate;
