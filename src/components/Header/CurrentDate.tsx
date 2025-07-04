import styles from './styles/CurrentDate.module.css';

const CurrentDate = () => {
  // Функция для форматирования даты
  const getFormattedDate = (): string => {
    const date = new Date();

    const weekdayOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
    };

    // Опции для дня, месяца и года
    const dayOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    // Получаем отформатированные части даты
    const weekday = date.toLocaleDateString('ru-RU', weekdayOptions);
    const dayMonthYear = date.toLocaleDateString('ru-RU', dayOptions);

    // Приводим первую букву дня недели к верхнему регистру
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Собираем итоговую строку
    return `${capitalizedWeekday} ${dayMonthYear}`;
  };

  return <div className={styles.date}>{getFormattedDate()}</div>;
};

export default CurrentDate;
