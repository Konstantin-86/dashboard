import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../../store/authStore/authStore';

import MyButton from '../UI/MyButton';
import Notification from '../UI/Notification';

import type { Person } from '../../types/types';

import { FaTimesCircle } from 'react-icons/fa';
import styles from '../../styles/Personals/DeletePerson.module.css';
import { usePersonStore } from '../../store/persons/personStore';

interface DeletePersonProps {
  selectedEmployee: Person;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Person | null>>;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePerson: React.FC<DeletePersonProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  setIsDeleteOpen,
}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { deletePerson } = usePersonStore();

  const handleDelete = async () => {
    if (!isLoggedIn) {
      setError('Вы не авторизованы. Пожалуйста, авторизуйтесь.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Удаляем из базы данных
      const { error: deleteError } = await supabase
        .from('persons')
        .delete()
        .eq('id', selectedEmployee.id);

      if (deleteError) throw deleteError;

      // Обновляем состояние в хранилище
      deletePerson(selectedEmployee.id);

      // Закрываем модальное окно через небольшой таймаут
      setTimeout(() => {
        setIsDeleteOpen(false);
        setSelectedEmployee(null);
      }, 1000);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при удалении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.inner}>
      {success && <Notification message="Сотрудник успешно удален" type="success" />}
      {error && <Notification message={error} type="error" />}

      <div className={styles.deletePerson}>
        <button
          className={styles.closeButton}
          onClick={() => setIsDeleteOpen(false)}
          disabled={loading}
        >
          <FaTimesCircle />
        </button>
        <h4>Вы действительно хотите удалить сотрудника {selectedEmployee.fullname}?</h4>
        <MyButton
          variant="accent"
          size="large"
          fullWidth
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Удаление...' : 'Удалить'}
        </MyButton>
      </div>
    </div>
  );
};

export default DeletePerson;