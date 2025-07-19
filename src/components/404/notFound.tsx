import { FaExclamationTriangle } from 'react-icons/fa'

import styles from '../../styles/404/NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}><FaExclamationTriangle color='red' size={30} /> Not Found</p>
        </div>
    )
}

export default NotFound