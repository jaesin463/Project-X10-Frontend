import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Regist.module.css";
import { signupUser } from "../api/api"; // API 호출 함수로 수정

export default function Regist() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwre, setPwre] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(0);

  const handleRegist = async (e) => {
    e.preventDefault();

    try {
      // 서버로 아이디와 비밀번호 전송
      const user = {
        userId: id,
        userPassword: pw,
        userName: name,
        userNickname: nickname,
        userEmail: email,
      };
      const response = await signupUser(user);

      // 서버에서 받은 응답을 확인하여 로그인 여부 결정
      console.log(response);
      if (response === 1) {
        alert("회원가입 성공!");
        // 회원가입 성공 후 다음 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
      } else {
        alert("아이디가 중복됩니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <>
      <div className={styles.regist_form}>
        <form onSubmit={handleRegist} className={styles.form}>
          <div className={styles.regist_div}>
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
          <div className={styles.regist_div}>
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
          <div className={styles.regist_div}>
            <input
              placeholder=" "
              type="password"
              name="pwre"
              value={pwre}
              onChange={(e) => {
                setPwre(e.target.value);
                if (pw === "" && e.target.value === "") {
                  setCheck(2);
                } else if (pw === e.target.value) {
                  setCheck(1);
                } else {
                  setCheck(2);
                }
              }}
              className={styles.input}
            />
            <label htmlFor=" " className={styles.label}>
              {check === 0 ? (
                <>비밀번호확인</>
              ) : check === 1 ? (
                <>비밀번호가 일치합니다</>
              ) : (
                <>비밀번호가 일치하지 않아요</>
              )}
            </label>
          </div>
          {check === 1 && (
            <div>
              <div className={styles.regist_div}>
                <input
                  placeholder=" "
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
                <label htmlFor=" " className={styles.label}>
                  이름
                </label>
              </div>
              <div className={styles.regist_div}>
                <input
                  placeholder=" "
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={styles.input}
                />
                <label htmlFor=" " className={styles.label}>
                  닉네임
                </label>
              </div>
              <div className={styles.regist_div}>
                <input
                  placeholder=" "
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <label htmlFor=" " className={styles.label}>
                  이메일
                </label>
              </div>
            </div>
          )}
          <input type="submit" className={styles.button} value="회원가입" />
        </form>
      </div>
    </>
  );
}
