import { Link } from "react-router";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section>
          <h2>Studio Spot</h2>
          <p> Find the perfect studio for your next project.</p>
        </section>

        <nav aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/studios">Studios</Link>
          <Link to="/managebooking">Manage Booking</Link>
        </nav>

        <section>
          <h3>Contact</h3>
          <a href="mailto:hello@studiospot.example">hello@studiospot.example</a>
        </section>

        <section className={styles.followSection}>
          <h3>Follow us</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </section>
      </div>
      <p className={styles.copyright}>
        &copy; 2026 Studio Spot. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
