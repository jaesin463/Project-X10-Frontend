import Container from "./Container";
import styles from "./Nav.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to={"/"}>
          <img src={logo} alt="xten Logo" width="60px" />
        </Link>
        <ul className={styles.menu}>
          <li>알림</li>
          <li>설정</li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
