import { useState } from "react";
import Container from "../components/Container";
import Login from "../components/login";
import Regist from "../components/regist";
import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  const [login, setLogin] = useState(true);
  const change = () => {
    setLogin(!login);
  };
  return (
    <>
      <Container>
        <div className={styles.welcomeFlex}>
          <div
            className={styles.left}
            style={{
              minHeight: login ? "450px" : "500px",
            }}
          >
            {login ? (
              <div>
                <h1>로그인</h1>
                <p className={styles.p}>
                  혹시 아직 회원이 아니신가요? &nbsp;&nbsp;
                  <span className={styles.span} onClick={change}>
                    회원가입
                  </span>
                </p>
                <Login />
              </div>
            ) : (
              <div>
                <h1>회원가입</h1>
                <p className={styles.p}>
                  혹시 이미 회원이신가요? &nbsp;&nbsp;
                  <span className={styles.span} onClick={change}>
                    로그인
                  </span>
                </p>
                <Regist />
              </div>
            )}
          </div>
          <div className={styles.right}>
            <div>웰컴페이지입니다.</div>
          </div>
        </div>
      </Container>
    </>
  );
}
