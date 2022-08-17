import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header className={styles.header}>
        <nav>
            <span>Employees</span>
            <ul>
                <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : undefined}>Add</NavLink></li>
                <li><NavLink to="/employees" className={({isActive}) => isActive ? styles.active : undefined}>Employees</NavLink></li>
                <li className={styles.contact}>Contact</li>
            </ul>
        </nav>
        </header>
    )
}