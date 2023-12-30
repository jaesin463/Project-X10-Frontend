import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import styles from "./SolvePage.module.css";
import {
  quizreadyroomInfomember,
  questionInworkbook,
  quizroomInfo,
  getUserquizrecord,
  getTime,
} from "../api/api";
import { useParams } from "react-router-dom";

const PAGE_SIZE = 1; // 페이지당 퀴즈 수

export default function SolvePage() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [solveusers, setSolveusers] = useState([]);
  const [allquestion, setAllquestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTime, setCurrentTime] = useState("");

  const { groupid, quizroomId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        const members = await quizreadyroomInfomember(quizroomId);
        const nowquizroom = await quizroomInfo(quizroomId);
        const allQ = await questionInworkbook(nowquizroom.quizRoomWorkbookId);
        // const nowtime = await getTime(loginUser.userId);
        setSolveusers(members);
        setAllquestion(allQ);
        // console.log(nowtime);
        console.log(allQ);
        console.log(members);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [quizroomId]);

  //문제제출을 눌렀을떄 가져온 starttime을 넣고 포스트보내면된다
  const quizrecord = {
    questionId,
    userId: loginUser,
    isCorrect: "이거는 맞았는지 틀렸는지 또 확인값을 넣어야함",
    recordTime: currentTime,
  };

  const handlesubmit = () => {};

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
    const time = await getTime(userId);
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
              {paginateQuestions().map((quiz, index) => (
                <div className={styles.문제가들어갈곳} key={quiz.questionId}>
                  <button className={styles.답안제출}>답안제출</button>
                  <div>{index + 1} 번 문제</div>
                  <div>문제 : {quiz.questionQ}</div>
                  {quiz.questionType === 2 && (
                    <div>
                      <input
                        type="text"
                        id="shortAnswer"
                        name="shortAnswer"
                        placeholder="답을 입력하세요"
                      />
                    </div>
                  )}
                  {quiz.questionType == 3 && (
                    <div>
                      <button>O</button>
                      <button>X</button>
                    </div>
                  )}
                  {/*1객관식 2단답형 3OX */}
                  {quiz.questionType === 1 && (
                    <div>
                      {quiz.multipleChoices.map((choice, choiceIndex) => (
                        <div key={choiceIndex}>
                          <input
                            type="radio"
                            id={`choice_${choiceIndex}`}
                            name="multipleChoice"
                            value={choice.choiceContent}
                          />
                          <label htmlFor={`choice_${choiceIndex}`}>
                            {choiceIndex + 1}. {choice.choiceContent}
                          </label>
                        </div>
                      ))}
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
      </Container>
    </>
  );
}
