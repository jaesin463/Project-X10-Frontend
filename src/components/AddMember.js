import { useState } from "react";
import { groupInvite, searchMember } from "../api/api";
import styles from "./AddMember.module.css";

export default function AddMember({ setModalIsOpen, groupid }) {
  const [search, setSearch] = useState("");
  const [member, setMember] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      const result = await searchMember(search, groupid);
      if (!result) return;
      setMember(result);
    }
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(false)}>닫기</button>
      <div>유저검색</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="키워드검색"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        ></input>
        <button>검색</button>
      </form>
      <div>검색결과</div>
      <div>
        {member.map((mem) => (
          <div key={mem.userId}>
            <div>{mem.userId}</div>
            <div>{mem.userName}</div>
            <div>{mem.userNickname}</div>
            <div>{mem.userSolvedQuestion}</div>
            <div>{mem.userLevel}</div>
            <button onClick={() => groupInvite(mem.userId, groupid)}>
              추가
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
