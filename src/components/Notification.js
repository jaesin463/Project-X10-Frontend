import React, { useEffect, useState } from "react";
import { readAllNotice, checkNotice, readGroup } from "../api/api";

const Notification = ({ userId }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    readAllNotice(userId)
      .then(setNotices)
      .catch((error) => console.error("Error handling notices:", error));
  }, [userId]);

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

  return (
    <div>
      {notices.map((notice) => {
        const isRead = notice.noticeCheck === 1;

        return (
          <div
            key={notice.noticeId}
            className={`notification ${isRead ? "read" : "unread"}`}
          >
            <p style={{ color: isRead ? "grey" : "black" }}>
              {notice.noticeType === 1
                ? `${notice.sendGroup} 그룹에서 초대 요청이 도착했습니다`
                : notice.noticeType === 2
                ? `${notice.sendGroup} 그룹의 그룹장이 되셨습니다`
                : "알림"}
            </p>
            {notice.noticeType === 1 && !isRead && (
              <>
                <button onClick={() => handleAction(notice, "accept")}>
                  수락
                </button>
                <button onClick={() => handleAction(notice, "decline")}>
                  거절
                </button>
              </>
            )}
            {notice.noticeType === 2 && !isRead && (
              <button onClick={() => handleAction(notice, "confirm")}>
                확인
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
