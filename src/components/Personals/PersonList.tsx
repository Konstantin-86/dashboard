import { useState } from 'react';

import type { Person } from '../../types/types';

import styles from '../../styles/Personals/PersonList.module.css';
import { FaUserCircle } from 'react-icons/fa';
import Employee from './Employee';
import { usePersonStore } from '../../store/persons/personStore';


const PersonList = () => {

  const [selectedEmployee, setSelectedEmployee] = useState<Person | null>(null);
  const closeAll = () => {
    setSelectedEmployee(null);
  };
  const { persons } = usePersonStore();

  return (
    <>
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
      {
        selectedEmployee && (
          <Employee
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            closeAll={closeAll}
          />
        )

      }


    </>
  );
};

export default PersonList;
