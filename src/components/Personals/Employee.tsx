import { useState } from 'react';
import { FaPencilAlt, FaTimesCircle, FaUserCircle } from 'react-icons/fa';
import EditPerson from './EditPerson';

import type { Person } from '../../types/types';
import styles from '../../styles/Personals/Employee.module.css';

interface IProps {
    selectedEmployee: Person;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Person | null>>;
    persons: Person[];
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
    closeAll: () => void;
}

const Employee: React.FC<IProps> = ({ selectedEmployee, setSelectedEmployee, persons, setPersons, closeAll }) => {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    return (
        <div className={styles.employeeModal} onClick={() => setSelectedEmployee(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeAll}>
                    <FaTimesCircle />
                </button>

                <div className={styles.employeeDetails}>
                    {!isEditOpen && (
                        <div className={styles.edit} onClick={() => setIsEditOpen(true)}>
                            <FaPencilAlt color="var(--color-edit)" size={20} />
                        </div>
                    )}

                    <div className={styles.leftSide}>
                        {selectedEmployee.photourl ? (
                            <img
                                src={selectedEmployee.photourl}
                                alt={selectedEmployee.fullname}
                                className={styles.detailPhoto}
                            />
                        ) : (
                            <FaUserCircle size={100} />
                        )}
                        <div className={styles.colorBar}>
                            <div
                                className={styles.colorBox}
                                style={{ backgroundColor: selectedEmployee.color }}
                            ></div>
                        </div>
                    </div>
                    <div className={styles.detailInfo}>
                        <h2>{selectedEmployee.fullname}</h2>
                        <p>
                            <strong>Телефон:</strong> {selectedEmployee.phone}
                        </p>
                        <p>
                            <strong>Telegram:</strong> {selectedEmployee.telegram}
                        </p>
                        <p>
                            <strong>Дата приема на работу:</strong> {selectedEmployee.hiredate}
                        </p>
                    </div>
                </div>
                {isEditOpen && (
                    <EditPerson
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                        setPersons={setPersons}
                        setIsEditOpen={setIsEditOpen}
                    />
                )}
            </div>
        </div>
    )
}

export default Employee