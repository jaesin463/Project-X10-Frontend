import Container from "../components/Container";
import styles from "./SolveExplanationPage.module.css";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { questionInworkbook, getUserquizrecord } from "../api/api";

export default function SolveExplanationPage() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [nowCorrect, setNowCorrect] = useState(0);
  const [nowquizlist, setNowquizlist] = useState([]);
  const [myquizresult, setMyquizresult] = useState([]);
  const [roundNumbers, setRoundNumbers] = useState([]);
  console.log(roundNumbers);

  const { userId, roundNumber, workbookId } = useParams();
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setNowCorrect((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allQ = await questionInworkbook(workbookId);
        setNowquizlist(allQ);

        const response = await getUserquizrecord(workbookId, userId);
        setMyquizresult(response);

        // 중복 없이 roundNumber 추출
        const uniqueRoundNumbers = Array.from(
          new Set(response.map((result) => result.roundNumber))
        );
        setRoundNumbers(uniqueRoundNumbers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRoundButtonClick = (clickedRoundNumber) => {
    // 클릭된 버튼의 roundNumber로 페이지 이동
    navigate(
      `/study/${userId}/${workbookId}/${clickedRoundNumber}/solveexplane`
    );
  };

  return (
    <>
      <Container>
        <div className={styles.회차고르기}>
          현재보고있는회차: {roundNumber}회차
        </div>
        {/* 회차 버튼 생성 */}
        <div className={styles.roundButtons}>
          {roundNumbers.map((number) => (
            <button
              key={number}
              className={number === roundNumber ? styles.activeRoundButton : ""}
              onClick={() => handleRoundButtonClick(number)}
            >
              {number}회차
            </button>
          ))}
        </div>
        <div className={styles.이번회차정보}>
          <div className={styles.이번회차결과}>{roundNumber}회차 결과</div>
          <div className={styles.회차정보미드}>
            <div>
              <div>몇문제 맞았는지</div>
              {
                myquizresult.filter(
                  (result) =>
                    result.correct &&
                    result.roundNumber.toString() === roundNumber
                ).length
              }
              /{nowquizlist.length}
            </div>
            <div>
              <div>
                단답형{" "}
                {
                  myquizresult.filter(
                    (result) =>
                      result.questionType === 2 &&
                      result.correct &&
                      result.roundNumber.toString() === roundNumber
                  ).length
                }
                /{nowquizlist.filter((quiz) => quiz.questionType === 2).length}
              </div>
              <div>
                객관식{" "}
                {
                  myquizresult.filter(
                    (result) =>
                      result.questionType === 1 &&
                      result.correct &&
                      result.roundNumber.toString() === roundNumber
                  ).length
                }
                /{nowquizlist.filter((quiz) => quiz.questionType === 1).length}
              </div>
              <div>
                O,X{" "}
                {
                  myquizresult.filter(
                    (result) =>
                      result.questionType === 3 &&
                      result.correct &&
                      result.roundNumber.toString() === roundNumber
                  ).length
                }
                /{nowquizlist.filter((quiz) => quiz.questionType === 3).length}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.끝으로보내기}>
          <input
            type="checkbox"
            checked={nowCorrect === 1}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="correctCheckbox">틀린 문제만 보기</label>
        </div>
        {nowquizlist.map((quiz, index) => {
          const result = myquizresult.find(
            (r) =>
              r.questionId === quiz.questionId &&
              r.roundNumber.toString() === roundNumber
          );
          const questionStyleClass = result
            ? result.correct
              ? styles.correctQuestion
              : styles.incorrectQuestion
            : styles.defaultQuestion;

          return (
            <div
              className={`${styles.문제들공간} ${questionStyleClass}`}
              key={quiz.questionId}
            >
              <div className={styles.중앙정렬}>
                <div>{index + 1}번문제</div>
                <div>문제 : {quiz.questionQ}</div>
                {quiz.questionType === 2 && <div>정답 : {quiz.questionA}</div>}
                {quiz.questionType === 3 && quiz.questionA === 1 && (
                  <div>정답 : O</div>
                )}
                {quiz.questionType === 3 && quiz.questionA === 2 && (
                  <div>정답 : X</div>
                )}
                {quiz.questionType === 1 && (
                  <div>
                    {quiz.multipleChoices.map((choice, choiceIndex) => (
                      <div key={choice.multipleChoiceId}>
                        {choice.answer === true && (
                          <>
                            <div>
                              정답 : {choice.multipleChoiceId}번{" "}
                              {choice.choiceContent}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div>해설 : {quiz.questionExplain}</div>
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}
