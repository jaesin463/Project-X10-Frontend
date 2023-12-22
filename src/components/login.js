import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "../api/api"; // API 호출 함수로 수정

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 서버로 아이디와 비밀번호 전송
      const user = {
        userId: id,
        userPassword: pw,
      };
      const response = await loginUser(user);

      // 서버에서 받은 응답을 확인하여 로그인 여부 결정
      if (response) {
        alert("로그인 성공!");
        // 로그인 성공 후 다음 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
        localStorage.setItem("loginUser", JSON.stringify(response));
        const loginUser = JSON.parse(localStorage.getItem("loginUser")).userId;
        console.log(loginUser);
        navigate(`/my/${loginUser}`); // 여기서 페이지 이동
      }
    } catch (error) {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
      console.error("로그인 에러:", error);
    }
  };

  return (
    <>
      <div className={styles.login_form}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.login_div}>
            <input
              placeholder=" "
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={styles.input}
            />
            <label htmlFor=" " className={styles.label}>
              아이디
            </label>
          </div>
          <div className={styles.login_div}>
            <input
              placeholder=" "
              type="password"
              name="pw"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={styles.input}
            />
            <label htmlFor=" " className={styles.label}>
              비밀번호
            </label>
          </div>
          <input type="submit" className={styles.button} value="로그인" />
        </form>
      </div>
    </>
  );
}
