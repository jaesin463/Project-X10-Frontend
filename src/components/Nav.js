import Container from "./Container";
import styles from "./Nav.module.css";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [islogin, setIslogin] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [ntoggle, setNToggle] = useState(false);
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

  // 페이지 이동 시 토글 닫기
  useEffect(() => {
    setToggle(false);
    setNToggle(false);
  }, [location.pathname]);

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to={islogin ? `my/${loginUser.userId}` : "/"}>
          <img src={logo} alt="xten Logo" width="60px" />
        </Link>
        <div>
          {islogin && (
            <div className={styles.menu}>
              <img
                src={`http://localhost:8080/upload/${loginUser.userImg}`}
                alt={loginUser.userImg}
                width="50"
              ></img>
              <div onClick={() => setNToggle(!ntoggle)}>알림</div>
              {ntoggle && (
                <div className={styles.toggle}>
                  <Link to={`my/${loginUser.userId}/edit`}>
                    <button
                      onClick={() => setToggle(false)}
                      className={styles.togglebtn}
                    >
                      알림
                    </button>
                  </Link>
                  <button onClick={logout} className={styles.togglebtn}>
                    기능
                  </button>
                </div>
              )}
              <div
                onClick={() => setToggle(!toggle)}
                className={`${styles.div} ${styles.pointer}`}
              >
                설정
              </div>
              {toggle && (
                <div className={styles.toggle}>
                  <Link to={`my/${loginUser.userId}/edit`}>
                    <button
                      onClick={() => setToggle(false)}
                      className={styles.togglebtn}
                    >
                      회원정보수정
                    </button>
                  </Link>
                  <button onClick={logout} className={styles.togglebtn}>
                    로그아웃
                  </button>
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
