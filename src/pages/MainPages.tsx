
import Stats from '../components/Stats'
import SkeletonMain from '../components/SkeletonMain'

import styles from '../styles/Pages/MainPages.module.css'

const MainPages = () => {
    return (
        <div className={styles.container}>
            <SkeletonMain />
            <Stats />
        </div>
    )
}

export default MainPages