import { useState } from "react";
import { groupCreate } from "../api/api";
import styles from "./StudyGroupCreate.module.css";
import FileInput from "./FileInput";

const StudyGroupCreate = ({
  userId,
  setModalIsOpen,
  setUserGroups,
  userGroups,
}) => {
  const [value, setValue] = useState({
    groupLeaderId: userId,
    groupName: "",
    groupDetail: "",
    groupImg: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("groupImg", value.groupImg);

    const result = await groupCreate(
      {
        groupLeaderId: value.groupLeaderId,
        groupName: value.groupName,
        groupDetail: value.groupDetail,
      },
      formData
    );
    if (!result) return;

    setModalIsOpen(false);
    setUserGroups([...userGroups, value]);
  };
  console.log(value.groupImg);

  return (
    <>
      <div className={styles.create}>새로운 스터디그룹 만들기</div>
      <div>
        <form onSubmit={handleSubmit}>
          <FileInput
            className="ReviewForm-preview"
            name="groupImg"
            value={value.groupImg}
            onChange={handleChange}
          />
          <div className={styles.inputs}>
            <div className={styles.flex}>
              <label htmlFor="groupName" className={styles.label}>
                그룹이름
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
                그룹설명
              </label>
              <textarea
                placeholder="그룹설명"
                name="groupDetail"
                value={value.groupDetail}
                onChange={handleInputChange}
                className={styles.textarea}
              ></textarea>
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
export default StudyGroupCreate;
