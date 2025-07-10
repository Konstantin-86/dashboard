import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaTimesCircle, FaUserCircle, FaPencilAlt } from 'react-icons/fa';

import EditPerson from './EditPerson';
import AddPerson from './AddPerson';

import type { Person } from '../../types/types';

import styles from '../../styles/Personals/Person.module.css';
import PersonSkeleton from './PersonSkeleton';
import PersonList from './PersonList';

const Person = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Person | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('null');

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('persons')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setPersons(data as Person[]);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error:', err);
          setError(err.message || 'Произошла ошибка при добавлении сотрудника');
        } else {
          console.error('Unknown error:', err);
          setError('Произошла неизвестная ошибка при добавлении сотрудника');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, []);

  const closeAll = () => {
    setSelectedEmployee(null);
    setIsEditOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Сотрудники</h1>
      <ul className={styles.personnelList}>
        {persons.map((employee) => (
          <li
            key={employee.id}
            className={styles.personnelCard}
            onClick={() => setSelectedEmployee(employee)}
          >
            {employee.photourl ? (
              <img
                width={80}
                height={80}
                loading="lazy"
                src={employee.photourl}
                alt={employee.fullname}
                className={styles.employeePhoto}
              />
            ) : (
              <FaUserCircle size={40} color="#ccc" className={styles.employeeIcon} />
            )}
            <div className={styles.employeeInfo}>
              <h3>{employee.fullname}</h3>
            </div>
          </li>
        ))}
      </ul>
      <AddPerson setPersons={setPersons} />
      {selectedEmployee ? (
        <PersonList
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          setPersons={setPersons}
          closeAll={closeAll}
        />
      ) : (
        <PersonSkeleton />
      )}
    </div>
  );
};

export default Person;
