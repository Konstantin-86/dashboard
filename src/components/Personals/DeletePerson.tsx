import React from 'react'
import { supabase } from '../lib/supabaseClient'
import MyButton from '../UI/MyButton'
import { FaTimesCircle } from 'react-icons/fa'

import type { Person } from '../../types/types'
import styles from '../../styles/Personals/DeletePerson.module.css'

interface DeletePersonProps {
    selectedEmployee: Person
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Person | null>>
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const DeletePerson: React.FC<DeletePersonProps> = ({ selectedEmployee, setSelectedEmployee, setPersons, setIsDeleteOpen }) => {
    const deletePerson = async () => {
        try {
            // Удаляем запись из Supabase
            const { error } = await supabase
                .from('persons') // Замените на имя вашей таблицы
                .delete()
                .eq('id', selectedEmployee.id) // Удаляем по ID

            if (error) throw error

            // Обновляем локальное состояние только если удаление в Supabase прошло успешно
            setPersons(prevData => prevData.filter(item => item.id !== selectedEmployee.id));
            setSelectedEmployee(null);
            setIsDeleteOpen(false);

        } catch (error) {
            console.error('Error deleting person:', error)
            // Здесь можно добавить обработку ошибки, например, показать уведомление пользователю
        }
    }
    return (
        <div className={styles.inner}>

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