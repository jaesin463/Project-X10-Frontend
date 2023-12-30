import Container from "../components/Container";
import styles from "./StudyGroupEditPage.module.css";
import AddMember from "../components/AddMember";
import GroupMember from "../components/GroupMember";
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
    const fetchGroup = async () => {
      try {
        const groupData = await readGroup(groupid);
        setGroup(groupData);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroup();
  }, [groupid]); // groupId가 변경될 때마다 실행

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
          <GroupMember group={group} />
        </div>
      </Container>
    </>
  );
}
