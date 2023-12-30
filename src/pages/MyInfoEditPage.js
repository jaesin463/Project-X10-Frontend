import Container from "../components/Container";
import styles from "./MyInfoEditPage.module.css";
import { useState } from "react";
import { editUser, profileUpdate } from "../api/api";
import FileInput from "../components/FileInput";

export default function MyInfoEditPage() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [id, setId] = useState(loginUser.userId);
  const [pw, setPw] = useState("");
  const [pwre, setPwre] = useState("");
  const [name, setName] = useState(loginUser.userName);
  const [nickname, setNickname] = useState(loginUser.userNickname);
  const [email, setEmail] = useState(loginUser.userEmail);
  const [check, setCheck] = useState(0);

  const user = {
    userPassword: pw,
    userNickname: nickname,
  };

  const [value, setValue] = useState({
    userImg: null,
  });

  const handleChange = (name, value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  console.log(value);

  const handleEdit = async (e) => {
    e.preventDefault();
    editUser(user);
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const formData2 = new FormData();
    formData2.append("userImg", value.userImg);

    const result = await profileUpdate(formData2, id);
    localStorage.setItem("loginUser", JSON.stringify(result));
    if (!result) return;
  };
  return (
    <Container className={styles.container}>
      <div className={styles.title}>회원 정보 수정</div>
      <form onSubmit={handleProfile}>
        <FileInput
          className="ReviewForm-preview"
          name="userImg"
          value={value.userImg}
          onChange={handleChange}
        />
        <button className={styles.profilebtn}>프로필 이미지 변경</button>
      </form>
      <div className={styles.regist_form}>
        <form onSubmit={handleEdit} className={styles.form}>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              아이디
            </label>
            <input
              disabled
              placeholder=" "
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              비밀번호
            </label>
            <input
              placeholder=" "
              type="password"
              name="pw"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              {check === 0 ? (
                <>비밀번호확인</>
              ) : check === 1 ? (
                <>비밀번호가 일치합니다</>
              ) : (
                <>비밀번호가 일치하지 않아요</>
              )}
            </label>
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
          </div>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              이름
            </label>
            <input
              disabled
              placeholder=" "
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              닉네임
            </label>
            <input
              placeholder=" "
              type="text"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.regist_div}>
            <label htmlFor=" " className={styles.label}>
              이메일
            </label>
            <input
              disabled
              placeholder=" "
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            회원정보수정
          </button>
        </form>
      </div>
    </Container>
  );
}
