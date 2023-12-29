import { useState } from "react";
import { WorkBookCreates } from "../api/api";
import styles from "./WorkBookCreate.module.css";

const WorkBookCreate = ({
  groupId,
  subjectId,
  setModalIsOpen,
  setWorkbookS,
  workbookS,
}) => {
  console.log(groupId);
  console.log(subjectId);
  console.log(workbookS);

  const [value, setValue] = useState({
    subjectId: subjectId,
    workbookTitle: "",
    workbookDetail: "",
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
    setModalIsOpen(false);
    setWorkbookS([...workbookS, value]);
    console.log(workbookS);
    e.preventDefault();
    const result = await WorkBookCreates(value, groupId);
    if (!result) return;
  };
  console.log(value.groupImg);

  return (
    <>
      <div className={styles.create}>새로운 문제집 만들기</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.flex}>
              <label htmlFor="workbookTitle" className={styles.label}>
                문제집이름
              </label>
              <input
                type="text"
                placeholder="그룹이름"
                name="workbookTitle"
                value={value.workbookTitle}
                onChange={handleInputChange}
                className={styles.input}
              ></input>
            </div>
            <div className={styles.flex}>
              <label htmlFor="workbookDetail" className={styles.label}>
                문제집설명
              </label>
              <textarea
                placeholder="그룹설명"
                name="workbookDetail"
                value={value.workbookDetail}
                onChange={handleInputChange}
                className={styles.textarea}
              ></textarea>
            </div>
            <div className={styles.flex}>
              <label htmlFor="workbookDeadline" className={styles.label}>
                출제기한
              </label>
              <input
                type="date"
                placeholder="출제기한"
                name="workbookDeadline"
                value={value.workbookDeadline}
                onChange={handleInputChange}
                className={styles.input}
              ></input>
            </div>
            <div className={styles.flex}>
              <label htmlFor="workbookQuota" className={styles.label}>
                문제수
              </label>
              <input
                type="text"
                placeholder="문제수"
                name="workbookQuota"
                value={value.workbookQuota}
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
