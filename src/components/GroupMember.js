import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userIngroup, changeLeader, deleteMember } from "../api/api";
import styles from "./GroupMember.module.css";

export default function GroupMember({ groupid }) {
  const [groupUsers, setGroupUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 추가

  useEffect(() => {
    const fetchGroupUsers = async () => {
      try {
        const users = await userIngroup(groupid);
        setGroupUsers(users);
      } catch (error) {
        console.error("Error fetching group users:", error);
      }
    };

    fetchGroupUsers();
  }, []); // 의존성 배열에 그룹 ID가 포함되어야 할 수도 있음

  const handleUserClick = (user) => {
    setSelectedUser(user); // 사용자 클릭 시 선택된 사용자 상태 업데이트
  };

  const handleDelete = async (groupid, userId) => {
    await deleteMember(groupid, userId);

    setGroupUsers(groupUsers.filter((g) => g.userId !== userId));
  };

  const handleAction = async (groupid, userId) => {
    await changeLeader(groupid, userId);
    navigate(`../`); // 여기서 페이지 이동
  };

  return (
    <>
      <div className={styles.userList}>
        {groupUsers.map((user) => (
          <div
            key={user.userId}
            className={styles.유저정보}
            onClick={() => handleUserClick(user)}
          >
            <span>{user.userId}</span>
            <span>{user.userName}</span>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className={styles.userInfo}>
          <div className={styles.인포탑}>
            <div className={styles.userImg}>이미지: {selectedUser.userId}</div>{" "}
            {/* 예시로 userId를 사용했습니다 */}
            <div className={styles.레벨과이름디브}>
              <span>레벨: {selectedUser.userLevel}</span>
              <span>{selectedUser.userName}</span>
            </div>
          </div>
          <div className={styles.인포바텀}>
            <button
              className={styles.방장위임}
              onClick={() => handleAction(groupid, selectedUser.userId)}
            >
              방장위임
            </button>
            <button
              className={styles.추방하기}
              onClick={() => handleDelete(groupid, selectedUser.userId)}
            >
              추방하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
