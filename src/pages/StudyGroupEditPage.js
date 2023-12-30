import Container from "../components/Container";
import styles from "./StudyGroupEditPage.module.css";
import AddMember from "../components/AddMember";
import Modal from "react-modal";
import ex from "../assets/ex.jpeg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readGroup } from "../api/api";

export default function StudyGroupEditPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const { groupid } = useParams();
  console.log(groupid);

  useEffect(() => {
    setGroup(readGroup(groupid));
    console.log(group);
  }, []);

  return (
    <>
      <Container>
        <div className={styles.그룹이미지디브}>
          <div className={styles.이미지}>
            <img src={ex} alt="dd" className={styles.groupimg}></img>
            <div className={styles.수정버튼위치}>
              <button>수정</button>
            </div>
          </div>
        </div>
        <div className={styles.그룹이름디브}>
          <div className={styles.그룹이름}>
            그룹이름입니당
            <div className={styles.수정버튼위치}>
              <button>수정</button>
            </div>
          </div>
        </div>
        <div className={styles.그룹설명디브}>
          <div className={styles.그룹설명}>
            그룹설명이 들어갈곳이예유
            <div></div>
            <div className={styles.수정버튼위치}>
              <button>수정</button>
            </div>
          </div>
        </div>
        <div className={styles.그룹멤버디브}>
          <div>
            <button onClick={() => setModalIsOpen(true)}>멤버추가</button>
            <Modal
              appElement={document.getElementById("root")}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                content: {
                  boxShadow: "0 0 15px 0px var(--bg-500)",
                  backgroundColor: "var(--bg-400)",
                  border: "solid 2.5px var(--bg-400)",
                  borderRadius: "10px",
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  position: "fixed",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                },
              }}
            >
              <AddMember setModalIsOpen={setModalIsOpen} groupid={groupid} />
            </Modal>
          </div>
        </div>
        <div className={styles.멤버들디브}>
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
        </div>
      </Container>
    </>
  );
}
