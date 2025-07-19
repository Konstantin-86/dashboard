import { useEffect } from 'react';
import { usePersonStore } from '../../store/persons/personStore';

import PersonSkeleton from './PersonSkeleton';
import PersonList from './PersonList';

import type { Person } from '../../types/types';

import styles from '../../styles/Personals/Person.module.css';
import AddPerson from './AddPerson';

const Person = () => {

  const { loaded, loading, getPersons } = usePersonStore();

  useEffect(() => {
    if (!loaded) {
      getPersons();
    }
  }, [getPersons, loaded])
  console.log("loading", loading);


  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <h1 className={styles.title}>Сотрудники</h1>
        <AddPerson />
      </div>
      {loading ? <PersonSkeleton /> : <PersonList />}
    </div>
  );
};

export default Person;
