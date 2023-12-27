import Container from "./Container";
import styles from "./Nav.module.css";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [islogin, setIslogin] = useState(false);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    alert("로그아웃!");
    setIslogin(false);
    setToggle(false);
    localStorage.removeItem("loginUser");
    navigate("/");
  };
  useEffect(() => {
    if (loginUser) setIslogin(true);
    else setIslogin(false);
  }, [loginUser, location.pathname]);

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to={islogin ? `my/${loginUser.userId}` : "/"}>
          <img src={logo} alt="xten Logo" width="60px" />
        </Link>
        <div>
          {islogin && (
            <div className={styles.menu}>
              <div>알림</div>
              <div onClick={() => setToggle(!toggle)} className={styles.div}>
                설정
              </div>
              {toggle && (
                <div className={styles.toggle}>
                  <Link to={`my/${loginUser.userId}/edit`}>
                    <button onClick={() => setToggle(false)}>
                      회원정보수정
                    </button>
                  </Link>
                  <button onClick={logout}>로그아웃</button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Nav;
