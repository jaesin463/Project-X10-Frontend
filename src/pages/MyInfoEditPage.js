import Container from "../components/Container";
import styles from "./MyInfoEditPage.module.css";
import { useState } from "react";
import { editUser } from "../api/api";

export default function MyInfoEditPage() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [id, setId] = useState(loginUser.userId);
  const [pw, setPw] = useState("");
  const [pwre, setPwre] = useState("");
  const [name, setName] = useState(loginUser.userName);
  const [nickname, setNickname] = useState(loginUser.userNickname);
  const [email, setEmail] = useState(loginUser.userEmail);
  //   const [img, setImg] = useState(loginUser.userImg);
  const [check, setCheck] = useState(0);

  const user = {
    userId: id,
    userPassword: pw,
    userName: name,
    userNickname: nickname,
    userEmail: email,
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    editUser(user);
  };
  return (
    <Container>
      <div>회원 정보 수정 페이지입니다.</div>
      <div className={styles.regist_form}>
        <form onSubmit={handleEdit} className={styles.form}>
          <div className={styles.regist_div}>
            <input
              disabled
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
          <div>
            <div className={styles.regist_div}>
              <input
                disabled
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
                disabled
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
          <input type="submit" className={styles.button} value="회원정보수정" />
        </form>
      </div>
    </Container>
  );
}
