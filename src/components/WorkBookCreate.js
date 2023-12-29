import { useState } from "react";
import { WorkBookCreates } from "../api/api";
import styles from "./WorkBookCreate.module.css";

const WorkBookCreate = ({
  subjectId,
  setModalIsOpen,
  setWorkbookS,
  workbookS,
}) => {
  const [value, setValue] = useState({
    subjectId: subjectId,
    workbookTitle: "",
    workbookDetail: "",
    workbookDate: "",
    workbookDeadline: "",
    workbookQuota: 0,
  });

  const handleChange = (name, value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await WorkBookCreates(value);
    if (!result) return;

    setModalIsOpen(false);
    setWorkbookS([...workbookS, value]);
  };
  console.log(value.groupImg);

  //아래부분 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <>
      <div className={styles.create}>새로운 문제집 만들기</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.flex}>
              <label htmlFor="groupName" className={styles.label}>
                문제집이름
              </label>
              <input
                placeholder="그룹이름"
                name="groupName"
                value={value.groupName}
                onChange={handleInputChange}
                className={styles.input}
              ></input>
            </div>
            <div className={styles.flex}>
              <label htmlFor="groupDetail" className={styles.label}>
                문제집설명
              </label>
              <textarea
                placeholder="그룹설명"
                name="groupDetail"
                value={value.groupDetail}
                onChange={handleInputChange}
                className={styles.textarea}
              ></textarea>
            </div>
            <div className={styles.flex}>
              <label htmlFor="groupName" className={styles.label}>
                출제기한
              </label>
              <input
                placeholder="그룹이름"
                name="groupName"
                value={value.groupName}
                onChange={handleInputChange}
                className={styles.input}
              ></input>
            </div>
            <div className={styles.flex}>
              <label htmlFor="groupName" className={styles.label}>
                문제수
              </label>
              <input
                placeholder="그룹이름"
                name="groupName"
                value={value.groupName}
                onChange={handleInputChange}
                className={styles.input}
              ></input>
            </div>
          </div>
          <div className={styles.buttonArea}>
            <button className={styles.button}>만들기</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default WorkBookCreate;
