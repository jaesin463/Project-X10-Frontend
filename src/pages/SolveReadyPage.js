import styles from "./SolveReadyPage.module.css";
import Container from "../components/Container";
import {
  quizreadyroomInfomember,
  quizroomInfo,
  workbookInfo,
} from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SolveReadyPage() {
  const [nowmembers, setNowmembers] = useState([]);
  const [nowinfo, setNowinfo] = useState({});
  const [nowworkbook, setNowworkbook] = useState({});

  const { quizroomId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await quizreadyroomInfomember(quizroomId);
        const quizroom = await quizroomInfo(quizroomId);
        const workbookinfo = await workbookInfo(quizroom.quizRoomWorkbookId);
        console.log("대기중인멤버들", members);
        console.log(quizroom);
        setNowmembers(members);
        setNowinfo(quizroom);
        setNowworkbook(workbookinfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [quizroomId]);

  const renderWaitMembers = () => {
    const maxMembers = nowinfo.quizRoomMaxNum;
    const currentMembers = nowmembers.length;

    const waitMembers = Array.from(
      { length: maxMembers - currentMembers },
      (_, index) => index
    );

    return waitMembers.map((index) => (
      <div className={styles.대기멤버} key={index}>
        <div>대기중</div>
      </div>
    ));
  };
  const renderEmptyMembers = () => {
    const currentMembers = nowmembers.length;
    const maxMembers = nowinfo.quizRoomMaxNum;
    const emptyMembers = Array.from(
      { length: 8 - maxMembers },
      (_, index) => index
    );

    return emptyMembers.map((index) => (
      <div className={styles.대기멤버} key={index}>
        <div>못들어와유</div>
      </div>
    ));
  };

  return (
    <>
      <Container>
        <div className={styles.방이름디브}>
          <span>방이름: {nowinfo.quizRoomTitle}</span>
          <span>방장: {nowinfo.quizRoomCreator}</span>
          <span>
            멤버: {nowmembers.length} / {nowinfo.quizRoomMaxNum}
          </span>
        </div>
        <div className={styles.밑에큰디브}>
          <div className={styles.준비멤버디브}>
            {nowmembers.map((user, index) => (
              <div className={styles.대기멤버} key={index}>
                <div className={styles.정보디브}>
                  <div className={styles.이미지}>이미지가 들어갈 공간</div>
                  <div className={styles.레벨이름}>
                    <span>{user.userNickname}</span>
                    <span>유저레벨: {user.userLevel}</span>
                  </div>
                </div>
                <div className={styles.준비중디브}>
                  <span>준비중</span>
                </div>
              </div>
            ))}
            {renderWaitMembers()}
            {renderEmptyMembers()}
          </div>
          <div className={styles.설정파일디브}>
            <div>문제집 이름: {nowworkbook.workbookTitle}</div>
            <button>start 버튼이나 ready 버튼</button>
          </div>
        </div>
      </Container>
    </>
  );
}
