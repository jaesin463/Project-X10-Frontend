import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import styles from "./Nav.module.css";
import logo from "../assets/logo.png";
import userpic from "../assets/user.png";
import bell from "../assets/bell.png";
import Notification from "./Notification";

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
    if (loginUser) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, [loginUser, location.pathname]);

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
                width="30"
                height="30"
              ></img>
              <img
                src={bell}
                alt="알림"
                onClick={() => setNToggle(!ntoggle)}
                className={`${styles.navimg} ${styles.div} ${styles.pointer}`}
              />
              {ntoggle && (
                <div className={styles.ntoggle}>
                  <Notification userId={loginUser.userId} />
                </div>
              )}
              <img
                src={userpic}
                alt="설정"
                onClick={() => setToggle(!toggle)}
                className={`${styles.navimg} ${styles.div} ${styles.pointer}`}
              />
              {toggle && (
                <div className={styles.toggle}>
                  <div>{loginUser.userNickname}님</div>
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
