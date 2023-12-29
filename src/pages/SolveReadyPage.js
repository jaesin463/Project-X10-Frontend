import styles from "./SolveReadyPage.module.css";
import Container from "../components/Container";
import {
  quizreadyroomInfomember,
  quizroomInfo,
  workbookInfo,
  userName,
  quizroomexit,
  workbookInsubject,
  updateQuizroom,
  readyUser,
  quizroomDelete,
} from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export default function SolveReadyPage() {
  const navigate = useNavigate(); // useNavigate 훅 추가

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [nowmembers, setNowmembers] = useState([]);
  const [allworkbook, setAllworkbook] = useState([]);
  const [nowinfo, setNowinfo] = useState({});
  //   console.log(nowinfo);

  const [nowworkbook, setNowworkbook] = useState({});
  const [nowleadername, setNowleadername] = useState();

  const [loginUser, setLoginUser] = useState(
    JSON.parse(localStorage.getItem("loginUser"))
  );

  const [show, setShow] = useState(false);

  const { groupid, quizroomId } = useParams();
  //   console.log("섭젝아이디" + groupid);
  //   console.log("퀴즈룸아이디" + quizroomId);

  //추방하기
  const handleDeleteUser = async (deleteuser) => {
    await quizroomexit(quizroomId, deleteuser.userId);

    // 상태 업데이트로 화면 다시 렌더링
    const updatedMembers = await quizreadyroomInfomember(quizroomId);
    setNowmembers(updatedMembers);
  };
  //내 스스로 나가기
  const handleexitUser = async (deleteuser) => {
    if (
      deleteuser.userId === nowinfo.quizRoomCreator &&
      nowmembers.length === 1
    ) {
      await quizroomDelete(quizroomId);
    }
    navigate(`/study/${groupid}`);
  };

  const handleReadyUser = async (userId) => {
    await readyUser(userId);
    const updatedMembers = await quizreadyroomInfomember(quizroomId);
    setNowmembers(updatedMembers);
  };
  const handleWorkbookChange = async (newWorkbookId) => {
    try {
      // 업데이트할 quizRoom 객체 생성
      const updatedQuizroom = {
        ...nowinfo, // 현재 정보 복사
        quizRoomWorkbookId: newWorkbookId, // 변경된 workbookId 할당
      };

      // updateQuizroom API 호출
      await updateQuizroom(updatedQuizroom);

      // 변경된 정보 다시 가져오기
      const updatedQuizroomInfo = await quizroomInfo(quizroomId);
      setNowinfo(updatedQuizroomInfo);
      setNowworkbook(
        await workbookInfo(updatedQuizroomInfo.quizRoomWorkbookId)
      );
    } catch (error) {
      console.error("Error updating quizroom:", error);
    }

    // 모달 닫기
    setModalIsOpen(false);
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행할 코드 작성

    // useEffect 함수 내에서 컴포넌트가 언마운트될 때 실행할 코드 작성
    return () => {
      // 페이지를 벗어나면 실행할 코드 작성
      if (nowmembers.length > 1) {
        quizroomexit(quizroomId, loginUser.userId);
        console.log("컴포넌트가 언마운트될 때 실행할 코드");
        // 예시: history.push("/somepage"); // 페이지 이동 등의 로직을 추가할 수 있음
      }
    };
  }, [nowmembers.length]); // nowmembers.length를 의존성 배열에 추가하여 nowmembers.length가 변경될 때마다 useEffect가 다시 실행되도록 함

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await quizreadyroomInfomember(quizroomId);
        const quizroom = await quizroomInfo(quizroomId);
        const workbookinfo = await workbookInfo(quizroom.quizRoomWorkbookId);
        const allworkbook = await workbookInsubject(groupid);
        console.log("모든문제집들", allworkbook);
        console.log(quizroom);
        setAllworkbook(allworkbook);
        setNowmembers(members);
        setNowinfo(quizroom);
        setNowworkbook(workbookinfo);
        // console.log(workbookinfo);
        const username = await userName(quizroom.quizRoomCreator);
        setNowleadername(username.userNickname);
        if (loginUser.userNickname === username.userNickname) {
          setShow(true);
        }
        // console.log("로그인유저 :", loginUser.userNickname);
        // console.log("지금리더유저 :", username.userNickname);
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
          <span>방장: {nowleadername}</span>
          <span>
            멤버: {nowmembers.length} / {nowinfo.quizRoomMaxNum}
          </span>
        </div>
        <div className={styles.밑에큰디브}>
          <div className={styles.준비멤버디브}>
            {nowmembers.map((user, index) => (
              <div className={styles.대기멤버} key={index}>
                {nowleadername !== user.userNickname && show && (
                  <button onClick={() => handleDeleteUser(user)}>
                    강퇴하기
                  </button>
                )}
                <div className={styles.정보디브}>
                  <div className={styles.이미지}>이미지가 들어갈 공간</div>
                  <div className={styles.레벨이름}>
                    <span>{user.userNickname}</span>
                    <span>유저레벨: {user.userLevel}</span>
                  </div>
                </div>
                {user.userNickname === nowleadername && (
                  <div className={styles.준비중디브}>
                    <span>방장</span>
                  </div>
                )}
                {user.userNickname !== nowleadername && user.isReady !== 0 && (
                  <div className={styles.준비중디브}>
                    <span>준비완료</span>
                  </div>
                )}
                {user.userNickname !== nowleadername && user.isReady === 0 && (
                  <div className={styles.준비중디브}>
                    <span>준비대기</span>
                  </div>
                )}
              </div>
            ))}
            {renderWaitMembers()}
            {renderEmptyMembers()}
          </div>
          <div className={styles.설정파일디브}>
            <div>문제집 이름: {nowworkbook.workbookTitle}</div>
            {show && (
              <button onClick={() => setModalIsOpen(true)}>문제집변경</button>
            )}
            <Modal
              appElement={document.getElementById("root")}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                content: {
                  boxShadow: "0 0 15px 0px var(--bg-500)",
                  backgroundColor: "var(--bg-400)",
                  border: "solid 2.5px var(--bg-400)",
                  borderRadius: "10px",
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  position: "fixed",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                },
              }}
            >
              <>
                <div>방 제목: {nowinfo.quizRoomTitle}</div>
                <div>현재 선택된 문제집: {nowworkbook.workbookTitle}</div>
                <div>문제집 변경하기 !</div>
                {allworkbook.map((wb, index) => (
                  <div key={index}>
                    {wb.workbookId === nowinfo.quizRoomWorkbookId && (
                      <>
                        <span>{wb.workbookTitle}</span>
                        <span> 현재 선택된 문제집입니다</span>
                      </>
                    )}
                    {wb.workbookId !== nowinfo.quizRoomWorkbookId && (
                      <>
                        <span>{wb.workbookTitle}</span>
                        <button
                          onClick={() => handleWorkbookChange(wb.workbookId)}
                        >
                          이문제집으로 변경
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </>
            </Modal>
            {show && <button>start</button>}
            {!show && (
              <button onClick={() => handleReadyUser(loginUser.userId)}>
                ready
              </button>
            )}
            <button onClick={() => handleexitUser(loginUser)}>방나가기</button>
          </div>
        </div>
      </Container>
    </>
  );
}
