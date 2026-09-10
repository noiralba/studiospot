import { Link } from "react-router";
import styles from './Navigation.module.scss';
import { FaRecordVinyl } from "react-icons/fa";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      
      <Link to="/" className={styles.logo}>
        <FaRecordVinyl style={{ color: '#0066cc' }} /> Studio Spot
        </Link>
      <section className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Hem
        </Link>
        <Link to="/studios" className={styles.navLink}>
          Studios
        </Link>
        <Link to="/managebooking" className={styles.navLink}>
          Min bokning
        </Link>
      </section>
    </nav>
  );
}

export default Navigation;
