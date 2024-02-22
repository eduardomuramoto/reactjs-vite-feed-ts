import styles from './Header.module.css'
import readitLogo from '../assets/readitlogo.svg';

export function Header() {
  return(
    <header className={styles.header}>
      <img src={readitLogo} alt="Read It Logo" />
      <strong>Read It</strong>
    </header>
  )
}