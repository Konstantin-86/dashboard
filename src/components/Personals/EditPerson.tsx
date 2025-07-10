import { useState } from 'react';
import type { ChangeEvent } from 'react';
import MyInput from '../UI/MyInput';
import type { Person } from '../../types/types';
import MyButton from '../UI/MyButton';
import styles from '../../styles/Personals/EditPerson.module.css';
import { supabase } from '../lib/supabaseClient';
import { FaTrashAlt } from 'react-icons/fa';
import DeletePerson from './DeletePerson';

interface EditPersonProps {
  selectedEmployee: Person;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Person | null>>;
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPerson: React.FC<EditPersonProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  setPersons,
  setIsEditOpen,
}) => {
  const [formData, setFormData] = useState({
    id: selectedEmployee.id,
    name: selectedEmployee.fullname,
    phone: selectedEmployee.phone,
    telegram: selectedEmployee.telegram,
    birthDate: selectedEmployee.birthdate,
    hireDate: selectedEmployee.hiredate,
    color: selectedEmployee.color,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/\D/g, '');
    let formattedValue = '+7 ';

    if (cleanedValue.length > 1) {
      const rest = cleanedValue.slice(1);
      formattedValue += rest.length > 0 ? `(${rest.slice(0, 3)}` : '';
      formattedValue += rest.length > 3 ? `) ${rest.slice(3, 6)}` : '';
      formattedValue += rest.length > 6 ? `-${rest.slice(6, 8)}` : '';
      formattedValue += rest.length > 8 ? `-${rest.slice(8, 10)}` : '';
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    if (!formData.name.trim()) {
      setError('Имя обязательно для заполнения');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedEmployee = {
        ...selectedEmployee,
        fullname: formData.name,
        phone: formData.phone,
        telegram: formData.telegram,
        birthdate: formData.birthDate,
        hiredate: formData.hireDate,
        color: formData.color,
      };
      console.log(updatedEmployee);

      // Обновляем в Supabase
      const { error: supabaseError } = await supabase
        .from('persons')
        .update({
          fullname: formData.name,
          phone: formData.phone,
          telegram: formData.telegram,
          birthdate: formData.birthDate,
          hiredate: formData.hireDate,
          color: formData.color,
        })
        .eq('id', selectedEmployee.id);

      if (supabaseError) throw supabaseError;

      // Обновляем локальное состояние
      setPersons((prev) =>
        prev.map((item) => (item.id === selectedEmployee.id ? updatedEmployee : item)),
      );
      setSelectedEmployee(updatedEmployee);
      setIsEditOpen(false);
    } catch (err) {
      console.error('Ошибка при обновлении сотрудника:', err);
      setError('Не удалось сохранить изменения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {selectedEmployee && (
        <div className={styles.content}>
          <h3 className={styles.title}>Редактирование сотрудника</h3>

          {error && <div className={styles.error}>{error}</div>}

          <MyInput
            name="name"
            fullWidth
            placeholder="ФИО"
            value={formData.name}
            onChange={handleInputChange}
          />

          <MyInput
            name="phone"
            fullWidth
            placeholder="Телефон"
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
          />

          <MyInput
            name="telegram"
            label="Telegram"
            fullWidth
            placeholder="@username"
            value={formData.telegram}
            onChange={handleInputChange}
          />

          <MyInput
            name="birthDate"
            label="Дата рождения"
            fullWidth
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
          />

          <MyInput
            name="hireDate"
            label="Дата приема"
            fullWidth
            type="date"
            value={formData.hireDate}
            onChange={handleInputChange}
          />

          <div className={styles.colorInner}>
            <label className={styles.label} htmlFor="color">
              Цвет
            </label>
            <input
              className={styles.inputColor}
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.buttons}>
            <MyButton variant="accent" onClick={saveChanges} loading={isLoading}>
              Сохранить
            </MyButton>
          </div>
        </div>
      )}
      <div className={styles.delete} onClick={() => setIsDeleteOpen(!isDeleteOpen)}>
        <FaTrashAlt color="var(--color-delete)" size={20} />
      </div>
      {isDeleteOpen && (
        <DeletePerson
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          setPersons={setPersons}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
    </div>
  );
};

export default EditPerson;
