import Container from "./Container";
import styles from './Nav.module.css';

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <img src="" alt="xten Logo" />
        <ul className={styles.menu}>
          <li>알림</li>
          <li>설정</li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
