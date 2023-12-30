import React, { useEffect, useState } from "react";
import { userIngroup } from "../api/api";
import styles from "./GroupMember.module.css";

export default function GroupMember({ group }) {
  const [groupUsers, setGroupUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchGroupUsers = async () => {
      try {
        if (!group || !group.groupId) {
          console.error("Group information is not provided");
          return;
        }
        let users = await userIngroup(group.groupId);
        users = users.filter((user) => user.userId !== group.groupLeaderId);
        setGroupUsers(users);
      } catch (error) {
        console.error("Error fetching group users:", error);
      }
    };

    fetchGroupUsers();
  }, [group, group?.groupId]); // 의존성 배열 업데이트

  const handleUserClick = (user) => {
    setSelectedUser(user); // 사용자 클릭 시 선택된 사용자 상태 업데이트
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
            <div className={styles.userImg}>이미지: {selectedUser.userImg}</div>{" "}
            <div className={styles.레벨과이름디브}>
              <span>레벨: {selectedUser.userLevel}</span>
              <span>{selectedUser.userName}</span>
            </div>
          </div>
          <div className={styles.인포바텀}>
            <button className={styles.방장위임}>방장위임</button>
            <button className={styles.추방하기}>추방하기</button>
          </div>
        </div>
      )}
    </>
  );
}
