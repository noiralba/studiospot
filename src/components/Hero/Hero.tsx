import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import styles from './Hero.module.scss';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Hitta rätt studio – boka på minuten</h1>
        <p className={styles.subtitle}>
          Utforska våra studios och boka den som passar dig bäst.
        </p>
        <Button type="button" onClick={() => navigate('/studios')}>
          Se studios
        </Button>
      </div>
    </section>
  );
}