import React, { useState, useEffect, useRef } from "react";
import Container from "../components/Container";
import styles from "./SolvePage.module.css";
import {
  quizreadyroomInfomember,
  questionInworkbook,
  quizroomInfo,
  getUserquizrecord,
  getTime,
  AddAnswer,
  quizroomDelete,
} from "../api/api";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 1; // 페이지당 퀴즈 수

export default function SolvePage() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [solveusers, setSolveusers] = useState([]);
  const [allquestion, setAllquestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [togglebtn, setTogglebtn] = useState(true);
  const navigate = useNavigate();
  const [ans, setAns] = useState("");
  const [anss, setAnss] = useState(0);
  const [workId, setWorkId] = useState("");

  const { groupid, quizroomId, timea } = useParams();
  const timerRef = useRef();
  const len = allquestion.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        const members = await quizreadyroomInfomember(quizroomId);
        const nowquizroom = await quizroomInfo(quizroomId);
        const allQ = await questionInworkbook(nowquizroom.quizRoomWorkbookId);
        const time = await getTime(loginUser.userId);
        setCurrentTime(time);
        setSolveusers(members);
        setWorkId(nowquizroom.quizRoomWorkbookId);
        setAllquestion(allQ);
        console.log(allQ);
        console.log(members);
        console.log(nowquizroom.quizRoomTimeLimit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [quizroomId]);

  //문제제출을 눌렀을떄 가져온 starttime을 넣고 포스트보내면된다
  //   const quizrecord = {
  //     questionId,
  //     userId: loginUser,
  //     isCorrect: "이거는 맞았는지 틀렸는지 또 확인값을 넣어야함",
  //     recordTime: currentTime,
  //   };

  const handleCount = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
    setTogglebtn(true);
  };

  const handleRestart = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(handleCount, 1000);
    }
  };

  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleCount();
    }, timea * 1000);
    // console.log(count);
    if (currentPage === len + 1 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      console.log("끝남");
      setModalIsOpen(true);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentPage]);
  const go = () => {
    const Id = quizroomId;
    quizroomDelete(Id);
    navigate(`/study/${loginUser.userId}/${workId}/1/solveexplane`);
  };

  const handleSubmitOx = (questionId) => {
    const anss = {
      questionId: questionId,
      userId: loginUser.userId,
      recordTime: currentTime,
      correct: allquestion[currentPage - 1].questionA === ans ? true : false,
    };
    console.log(anss);
    AddAnswer(anss);
    setAns("");
    setTogglebtn(false);
  };
  const handleSubmitG = (questionId) => {
    const anssd = {
      questionId: questionId,
      userId: loginUser.userId,
      recordTime: currentTime,
      correct: allquestion[currentPage - 1].multipleChoices[anss].answer,
    };
    console.log(anssd);
    AddAnswer(anssd);
    setAnss(-1);
    setTogglebtn(false);
  };
  const handleSubmitD = (questionId) => {
    const anss = {
      questionId: questionId,
      userId: loginUser.userId,
      recordTime: currentTime,
      correct: allquestion[currentPage - 1].questionA === ans ? true : false,
    };
    console.log(anss);
    AddAnswer(anss);
    setAns("");
    setTogglebtn(false);
  };

  // 전체 퀴즈를 페이지 단위로 자르는 함수
  const paginateQuestions = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return allquestion.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handelTime = async (userId) => {
    console.log(userId);
    const time = await getTime(loginUser.userId);
    setCurrentTime(time);
    console.log(time);
  };

  return (
    <>
      <Container>
        <div className={styles.big}>
          <div className={styles.시계}>시계</div>
          <button onClick={() => handelTime(loginUser.userId)}>시작</button>
          <div className={styles.mid}>
            <div className={styles.문제랑사람들}>
              {paginateQuestions().map((quiz) => (
                <div className={styles.문제가들어갈곳} key={quiz.questionId}>
                  <div>{currentPage} 번 문제</div>
                  <div>문제 : {quiz.questionQ}</div>
                  {/*1객관식 2단답형 3OXdd */}
                  {quiz.questionType === 1 && (
                    <div>
                      {quiz.multipleChoices.map((choice, choiceIndex) => (
                        <div key={choiceIndex}>
                          <input
                            type="radio"
                            id={`choice_${choiceIndex}`}
                            name="multipleChoice"
                            value={choice.choiceContent}
                            onClick={() => {
                              console.log(choiceIndex);
                              setAnss(choiceIndex);
                            }}
                          />
                          <label htmlFor={`choice_${choiceIndex}`}>
                            {choiceIndex + 1}. {choice.choiceContent}
                          </label>
                        </div>
                      ))}
                      {togglebtn && (
                        <button
                          className={styles.답안제출}
                          onClick={() => handleSubmitG(quiz.questionId)}
                        >
                          답안제출
                        </button>
                      )}
                    </div>
                  )}
                  {quiz.questionType === 2 && (
                    <div>
                      <input
                        type="text"
                        id="shortAnswer"
                        name="shortAnswer"
                        value={ans}
                        onChange={(e) => setAns(e.target.value)}
                        placeholder="답을 입력하세요"
                      />
                      {togglebtn && (
                        <button
                          className={styles.답안제출}
                          onClick={() => handleSubmitD(quiz.questionId)}
                        >
                          답안제출
                        </button>
                      )}
                    </div>
                  )}
                  {quiz.questionType === 3 && (
                    <div>
                      <button onClick={() => setAns("1")}>O</button>
                      <button onClick={() => setAns("2")}>X</button>
                      {togglebtn && (
                        <button
                          className={styles.답안제출}
                          onClick={() => handleSubmitOx(quiz.questionId)}
                        >
                          답안제출
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className={styles.pagination}>
                {Array.from(
                  { length: Math.ceil(allquestion.length / PAGE_SIZE) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? styles.active : ""}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
              <div className={styles.사람들이있는곳}>
                {solveusers.map((user, index) => (
                  <div className={styles.푸는유저} key={index}>
                    <div>
                      <div>{user.userNickname}</div>
                      <div>레벨 {user.userLevel}</div>
                    </div>
                    <div> 제출중 ...</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.채팅방}>채팅방</div>
          </div>
        </div>
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
          <div>수고하셨어요ㅋ</div>
          <button onClick={() => go()}>해설보러가자</button>
        </Modal>
      </Container>
    </>
  );
}
