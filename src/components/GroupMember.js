import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GroupMember.module.css";
import { userIngroup } from "../api/api"; // API 호출 함수로 수정

export default function Login() {
  return (
    <>
      <div className={styles.userList}>
        <div className={styles.유저정보}>
          {/*얘는 사람수만큼 돌릴거임*/}
          <span>이미지</span>
          <span>이름</span>
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.인포탑}>
          <div className={styles.userImg}>이미지가 들어갈거예요</div>
          <div className={styles.레벨과이름디브}>
            <span>레벨</span>
            <span>이름</span>
          </div>
        </div>
        <div className={styles.인포바텀}>
          <button className={styles.방장위임}>방장위임</button>
          <button className={styles.추방하기}>추방하기</button>
        </div>
      </div>
    </>
  );
}
