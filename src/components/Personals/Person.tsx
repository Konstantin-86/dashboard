import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

import AddPerson from './AddPerson';
import PersonSkeleton from './PersonSkeleton';
import PersonList from './PersonList';

import type { Person } from '../../types/types';

import styles from '../../styles/Personals/Person.module.css';

const Person = () => {

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
    /* setSelectedEmployee(null); */
    setIsEditOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сотрудники</h1>
      {loading ?
        <PersonSkeleton /> :
        <PersonList
          persons={persons}
          setPersons={setPersons}
        />
      }
      <AddPerson setPersons={setPersons} />
    </div>
  );
};

export default Person;
