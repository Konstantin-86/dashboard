import { Outlet } from '@tanstack/react-router'
import Header from './components/Header/Header'
import AsideMenu from './components/Aside/AsideMenu'

import styles from './styles/App.module.css'

function App() {
  return (
    <div className={styles.mainInner}>
      <Header />
      <AsideMenu />
      <Outlet />
    </div>
  )
}

export default App
