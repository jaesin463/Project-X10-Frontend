import React, { useEffect, useState } from "react";
import {
  readAllNotice,
  checkNotice,
  readGroup,
  deleteNotice,
} from "../api/api";
import styles from "./Notification.module.css";

const Notification = ({ userId }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // fetchNotices 함수는 비동기로 작동하여 모든 알림과 관련 그룹 정보를 가져옵니다.
    const fetchNotices = async () => {
      try {
        // 사용자의 모든 알림을 가져옵니다.
        const fetchedNotices = await readAllNotice(userId);

        // 각 알림에 대해 추가 정보를 가져오기 위해 Promise.all을 사용합니다.
        const noticesWithGroupName = await Promise.all(
          fetchedNotices.map(async (notice) => {
            const groupInfo = await readGroup(notice.sendGroup);
            // 가져온 그룹 정보를 기존 알림 객체에 추가합니다.
            return { ...notice, groupName: groupInfo.groupName };
          })
        );
        // 완성된 알림 목록을 상태에 저장합니다.
        setNotices(noticesWithGroupName);
      } catch (error) {
        // 오류 발생 시 콘솔에 로그를 출력합니다.
        console.error("Error handling notices:", error);
      }
    };

    // fetchNotices 함수를 호출합니다.
    fetchNotices();
  }, [userId]); // useEffect 훅은 userId가 변경될 때마다 실행됩니다.

  const handleAction = async (notice, actionType) => {
    try {
      const updatedCheckNotice = actionType === "decline" ? 0 : 1;

      // 서버에 알림 상태 업데이트 요청
      await checkNotice({ ...notice, noticeCheck: updatedCheckNotice });

      // 알림 목록 상태 업데이트
      setNotices(
        notices.map((n) =>
          n.noticeId === notice.noticeId ? { ...n, noticeCheck: 1 } : n
        )
      );
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  const handleDelete = async (noticeId) => {
    try {
      // 서버에 알림 삭제 요청
      await deleteNotice(noticeId);

      // 알림 목록 상태 업데이트 (삭제된 알림 제거)
      setNotices(notices.filter((n) => n.noticeId !== noticeId));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div>
      {notices.map((notice) => {
        const isRead = notice.noticeCheck === 1;

        return (
          <div
            key={notice.noticeId}
            className={`${styles.notification} ${
              isRead ? styles.read : styles.unread
            }`}
          >
            <p>
              {notice.noticeType === 1
                ? `${notice.groupName} 그룹에서 초대 요청이 도착했습니다`
                : notice.noticeType === 2
                ? `${notice.groupName} 그룹의 그룹장이 되셨습니다`
                : "알림"}
            </p>
            {notice.noticeType === 1 && !isRead && (
              <>
                <button
                  onClick={() => handleAction(notice, "accept")}
                  className={styles.button}
                >
                  수락
                </button>
                <button
                  onClick={() => handleAction(notice, "decline")}
                  className={styles.button}
                >
                  거절
                </button>
              </>
            )}
            {notice.noticeType === 2 && !isRead && (
              <button
                onClick={() => handleAction(notice, "confirm")}
                className={styles.button}
              >
                확인
              </button>
            )}
            <button
              onClick={() => handleDelete(notice.noticeId)}
              className={styles.button}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
