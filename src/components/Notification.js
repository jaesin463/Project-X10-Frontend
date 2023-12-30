import React, { useEffect, useState } from "react";
import { readAllNotice, checkNotice } from "../api/api";

const Notification = ({ userId }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    readAllNotice(userId)
      .then(setNotices)
      .catch((error) => console.error("Error handling notices:", error));
  }, [userId]);

  const handleAction = async (noticedata) => {
    try {
      // 알림을 읽은 상태로 변경하고 서버 응답을 기다림
      await checkNotice(noticedata);

      // 상태 업데이트
      setNotices(
        notices.map((notice) =>
          notice.noticeId === noticedata.noticeId
            ? { ...notice, checkNotice: 1 }
            : notice
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
                ? `${notice.sendGroup} 그룹에 초대되셨습니다`
                : notice.noticeType === 2
                ? `${notice.sendGroup} 그룹의 그룹장이 되셨습니다`
                : "알림"}
            </p>
            {notice.noticeType === 1 && !isRead && (
              <>
                <button onClick={() => handleAction(notice)}>수락</button>
                <button onClick={() => handleAction(notice)}>거절</button>
              </>
            )}
            {notice.noticeType === 2 && !isRead && (
              <button onClick={() => handleAction(notice)}>확인</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
