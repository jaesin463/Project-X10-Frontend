import { useState } from "react";
import { subjectUpdate } from "../api/api";
import Modal from "react-modal";
import styles from "../pages/StudyGroupPage.module.css";

const UpdateSubject = ({
  subjectId,
  groupid,
  subjectG,
  setSubjectG,
  subjectIndex,
}) => {
  const [modalIsOpen3, setModalIsOpen3] = useState(false);

  const [st, setSubjectTitle] = useState("");
  const [sc, setSubjectContent] = useState("");
  const closeSubjectUpdateModal = () => {
    setModalIsOpen3(false); // 과목 수정
    setSubjectTitle("");
    setSubjectContent("");
  };

  // subject 수정하기 제출버튼
  const subjectUpdateSubmit = (subjectId) => {
    console.log(subjectId);
    const newSubject = {
      subjectId: subjectId,
      groupId: groupid,
      subjectTitle: st,
      subjectContent: sc,
    };

    const updatedSubjectG = [...subjectG]; // 기존 subjectG 복사
    updatedSubjectG[subjectIndex] = newSubject; // 해당 인덱스에 새로운 값 할당
    setSubjectG(updatedSubjectG); // 업데이트된 subjectG로 설정
    subjectUpdate(newSubject);
    closeSubjectUpdateModal();
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "4em",
      gap: "2em",
    },
  };
  return (
    <>
      <button
        onClick={() => setModalIsOpen3(true)}
        className={styles.subjecteditBtn1}
      >
        수정
      </button>
      <div>
        <Modal
          appElement={document.getElementById("root")}
          isOpen={modalIsOpen3}
          onRequestClose={closeSubjectUpdateModal}
          style={modalStyles}
          contentLabel="Update Subject Modal"
        >
          <h2>과목 수정하기</h2>
          <div className={styles.modalcol}>
            <label>과목 제목</label>
            <input
              type="text"
              value={st}
              onChange={(e) => setSubjectTitle(e.target.value)}
              placeholder="Subject Title"
              className={styles.inputtxt}
            />
          </div>
          <div className={styles.modalcol}>
            <label>과목 설명</label>
            <input
              type="text"
              value={sc}
              onChange={(e) => setSubjectContent(e.target.value)}
              placeholder="Subject Content"
              className={styles.inputtxt}
            />
          </div>
          <button
            onClick={() => subjectUpdateSubmit(subjectId)}
            className={styles.subjecteditBtn1}
          >
            수정하기
            {subjectId}
          </button>
        </Modal>
      </div>
    </>
  );
};
export default UpdateSubject;
