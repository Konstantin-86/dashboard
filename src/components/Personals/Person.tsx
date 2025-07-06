import { useState, useEffect } from 'react';
import { FaTimesCircle, FaUserCircle } from 'react-icons/fa';
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import EditPerson from './EditPerson';
import DeletePerson from './DeletePerson';
import AddPerson from './AddPerson';
import { supabase } from '../lib/supabaseClient';


import type { Person } from '../../types/types';

import styles from '../../styles/Personals/Person.module.css';
import ImageUploader from './ImageUploader';



const Person = () => {

    const [selectedEmployee, setSelectedEmployee] = useState<Person | null>(null);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPersons();
    }, []);




    return (
        <div className={styles.container}>
            <h1>Сотрудники</h1>
            <ImageUploader />


            <div className={styles.personnelList}>
                {persons.map(employee => (
                    <div
                        key={employee.id}
                        className={styles.personnelCard}
                        onClick={() => setSelectedEmployee(employee)}
                    >
                        {employee.photourl ?
                            <img src={employee.photourl} alt={employee.fullname} className={styles.employeePhoto} /> :
                            <FaUserCircle size={40} color='#ccc' className={styles.employeeIcon} />}
                        <div className={styles.employeeInfo}>
                            <h3>{employee.fullname}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <AddPerson />

            {selectedEmployee && (
                <div className={styles.employeeModal} onClick={() => setSelectedEmployee(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setSelectedEmployee(null)}><FaTimesCircle /></button>

                        <div className={styles.employeeDetails}>
                            <div className={styles.edit} onClick={() => setIsEditOpen(!isEditOpen)}>
                                <FaPencilAlt color='var(--color-edit)' size={20} />
                            </div>
                            <div className={styles.delete} onClick={() => setIsDeleteOpen(!isDeleteOpen)}>
                                <FaTrashAlt color='var(--color-delete)' size={20} />
                            </div>
                            <div className={styles.leftSide}>
                                {selectedEmployee.photourl
                                    ?
                                    <img src={selectedEmployee.photourl} alt={selectedEmployee.fullname} className={styles.detailPhoto} />
                                    :
                                    <FaUserCircle size={100} />
                                }
                                <div className={styles.colorBar}>
                                    <div className={styles.colorBox} style={{ backgroundColor: selectedEmployee.color }}></div>
                                </div>
                            </div>
                            <div className={styles.detailInfo}>
                                <h2>{selectedEmployee.fullname}</h2>
                                <p><strong>Телефон:</strong> {selectedEmployee.phone}</p>
                                <p><strong>Telegram:</strong> {selectedEmployee.telegram}</p>
                                <p><strong>Дата рождения:</strong> {selectedEmployee.birthdate}</p>
                                <p><strong>Дата приема на работу:</strong> {selectedEmployee.hiredate}</p>
                            </div>

                        </div>
                        {isEditOpen && <EditPerson
                            selectedEmployee={selectedEmployee}
                            setSelectedEmployee={setSelectedEmployee}
                            setPersons={setPersons}
                            setIsEditOpen={setIsEditOpen}
                        />}
                        {isDeleteOpen && <DeletePerson
                            selectedEmployee={selectedEmployee}
                            setSelectedEmployee={setSelectedEmployee}
                            setPersons={setPersons}
                            setIsDeleteOpen={setIsDeleteOpen}
                        />}

                    </div>
                </div>
            )}

        </div>
    );
};

export default Person;