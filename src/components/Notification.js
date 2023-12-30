import React, { useEffect, useState } from "react";
import { readAllNotice, checkNotice } from "../api/api";

const Notification = ({ userId }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    readAllNotice(userId)
      .then(setNotices)
      .catch((error) => console.error("Error handling notices:", error));
  }, [userId]);

  const handleAction = (noticeId) => {
    // 알림을 읽은 상태로 변경
    checkNotice(noticeId);

    // 상태 업데이트
    setNotices(
      notices.map((notice) =>
        notice.noticeId === noticeId ? { ...notice, checkNotice: 1 } : notice
      )
    );
  };

  return (
    <div>
      {notices.map((notice) => {
        const isRead = notice.checkNotice === 1;

        return (
          <div
            key={notice.noticeId}
            className={`notification ${isRead ? "read" : "unread"}`}
          >
            <p style={{ color: isRead ? "grey" : "black" }}>
              {`${notice.sendGroup} 그룹에 초대되셨습니다`}
            </p>
            {notice.noticeType === 1 && !isRead && (
              <>
                <button onClick={() => handleAction(notice.noticeId)}>
                  수락
                </button>
                <button onClick={() => handleAction(notice.noticeId)}>
                  거절
                </button>
              </>
            )}
            {notice.noticeType === 2 && !isRead && (
              <button onClick={() => handleAction(notice.noticeId)}>
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
