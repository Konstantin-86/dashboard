import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { FaTimesCircle } from 'react-icons/fa'

import MyButton from '../UI/MyButton'
import Notification from '../UI/Notification'

import type { Person } from '../../types/types'
import styles from '../../styles/Personals/DeletePerson.module.css'

interface DeletePersonProps {
    selectedEmployee: Person
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Person | null>>
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const DeletePerson: React.FC<DeletePersonProps> = ({ selectedEmployee, setSelectedEmployee, setPersons, setIsDeleteOpen }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deletePerson = async () => {
        try {
            const { error } = await supabase
                .from('persons')
                .delete()
                .eq('id', selectedEmployee.id)

            if (error) throw error

            setPersons(prevData => prevData.filter(item => item.id !== selectedEmployee.id));
            setSelectedEmployee(null);
            setIsDeleteOpen(false);
            setSuccess(true);

        } catch (error) {
            console.error('Error deleting person:', error)
            setError('Произошла ошибка при удалении сотрудника');
        }
    }
    return (
        <div className={styles.inner}>
            {success && <Notification message="Сотрудник успешно удален" type="success" />}
            {error && <Notification message="Произошла ошибка при удалении сотрудника" type="error" />}

            <div className={styles.deletePerson}>
                <button className={styles.closeButton} onClick={() => setIsDeleteOpen(false)}><FaTimesCircle /></button>
                <h4>Вы действительно хотите удалить сотрудника?</h4>
                <MyButton
                    variant='accent'
                    size='large'
                    fullWidth
                    onClick={deletePerson}
                >   Удалить</MyButton>
            </div>
        </div>
    )
}

export default DeletePerson