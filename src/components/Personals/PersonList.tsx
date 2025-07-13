import { useState } from 'react';

import type { Person } from '../../types/types';

import styles from '../../styles/Personals/PersonList.module.css';
import { FaUserCircle } from 'react-icons/fa';
import Employee from './Employee';

interface IProps {
  persons: Person[]
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>
}

const PersonList: React.FC<IProps> = ({ persons, setPersons, }) => {

  const [selectedEmployee, setSelectedEmployee] = useState<Person | null>(null);
  const closeAll = () => {
    setSelectedEmployee(null);
  };

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
            persons={persons}
            setPersons={setPersons}
            closeAll={closeAll}
          />
        )

      }


    </>
  );
};

export default PersonList;
