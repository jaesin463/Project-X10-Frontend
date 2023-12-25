import Container from "./Container";
import styles from "./Nav.module.css";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [islogin, setIslogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (loginUser) setIslogin(true);
    else setIslogin(false);
  }, [loginUser, location.pathname]);

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to={"/"}>
          <img src={logo} alt="xten Logo" width="60px" />
        </Link>
        <ul className={styles.menu}>
          {islogin && (
            <>
              <li>알림</li>
              <li>설정</li>
            </>
          )}
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
