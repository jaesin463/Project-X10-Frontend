import Container from "../components/Container";
import styles from "./QuestionCreatePage.module.css";
import {
  questionInworkbook,
  userName,
  workbookInfo,
  userIngroup,
  makeQuestion,
  makeMultipleChoice,
  questionInfo,
  answerInfo,
  updateMulti,
  updateQuestion,
  deleteQuestion,
} from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import QuestionForm from "../components/QuestionForm";
import UpdateForm from "../components/Questionupdate";

async function fetchData(workbookid) {
  try {
    const questions = await questionInworkbook(workbookid);
    console.log("문제들:", questions);
    return questions;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export default function QuestionCreatePage() {
  const { groupid, workbookid } = useParams();
  // console.log(workbookid);

  const [question, setQuestion] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [toggleStates, setToggleStates] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [bookInfo, setBookInfo] = useState({});
  const [alluser, setAlluser] = useState([]);
  const [selectedType, setSelectedType] = useState();

  //문제집을낼거야준호야정신잘차리고써보자헷갈리지않게잘해보자
  const [qtitle, setQtitle] = useState("");
  const [qanswer, setQanswer] = useState("");
  const [qtype, setQtype] = useState("");
  const [qexplian, setQexplain] = useState("");
  const [qdifficult, setQdifficult] = useState();
  const [qmaker, setQmaker] = useState("");

  //객관식답안지
  const [mccontent1, setMCcontent1] = useState("");
  const [mccontent2, setMCcontent2] = useState("");
  const [mccontent3, setMCcontent3] = useState("");
  const [mccontent4, setMCcontent4] = useState("");
  const [mccontent5, setMCcontent5] = useState("");

  const [mcisanswer1, setMCisanswer1] = useState();
  const [mcisanswer2, setMCisanswer2] = useState();
  const [mcisanswer3, setMCisanswer3] = useState();
  const [mcisanswer4, setMCisanswer4] = useState();
  const [mcisanswer5, setMCisanswer5] = useState();

  const [mcid1, setMCid1] = useState();
  const [mcid2, setMCid2] = useState();
  const [mcid3, setMCid3] = useState();
  const [mcid4, setMCid4] = useState();
  const [mcid5, setMCid5] = useState();

  const mccontents = [
    setMCcontent1,
    setMCcontent2,
    setMCcontent3,
    setMCcontent4,
    setMCcontent5,
  ];
  const mcanswers = [
    setMCisanswer1,
    setMCisanswer2,
    setMCisanswer3,
    setMCisanswer4,
    setMCisanswer5,
  ];
  const mcids = [setMCid1, setMCid2, setMCid3, setMCid4, setMCid5];

  const handleMCAnswerChange = (answerIndex) => {
    // 선택된 보기에 대한 상태를 설정합니다.
    setMCisanswer1(answerIndex === 1 ? true : false);
    setMCisanswer2(answerIndex === 2 ? true : false);
    setMCisanswer3(answerIndex === 3 ? true : false);
    setMCisanswer4(answerIndex === 4 ? true : false);
    setMCisanswer5(answerIndex === 5 ? true : false);

    // 비동기로 동작하는 상태 업데이트를 확인하기 위해 useEffect 사용
  };

  //문제제출객관식용
  const regist0 = async (e) => {
    e.preventDefault();

    try {
      const question = {
        questionId: "",
        workbookId: workbookid,
        questionQ: qtitle,
        questionA: "0",
        questionType: qtype,
        questionExplain: qexplian,
        questionDifficulty: qdifficult,
        questionMaker: qmaker,
        questionSave: 1,
        questionImg: null,
      };
      const response = await makeQuestion(question);

      console.log(response.questionId);
      const questionId = response.questionId;

      const multipleChoice1 = {
        questionId: questionId,
        choiceContent: mccontent1,
        answer: mcisanswer1,
      };
      console.log(mcisanswer1);
      await makeMultipleChoice(multipleChoice1);

      const multipleChoice2 = {
        questionId: questionId,
        choiceContent: mccontent2,
        answer: mcisanswer2,
      };

      await makeMultipleChoice(multipleChoice2);
      const multipleChoice3 = {
        questionId: questionId,
        choiceContent: mccontent3,
        answer: mcisanswer3,
      };
      await makeMultipleChoice(multipleChoice3);
      const multipleChoice4 = {
        questionId: questionId,
        choiceContent: mccontent4,
        answer: mcisanswer4,
      };
      await makeMultipleChoice(multipleChoice4);
      const multipleChoice5 = {
        questionId: questionId,
        choiceContent: mccontent5,
        answer: mcisanswer5,
      };
      await makeMultipleChoice(multipleChoice5);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  //객관식수정용
  const update0 = async (e) => {
    e.preventDefault();
    console.log(nowQid);

    try {
      const question = {
        questionId: nowQid,
        workbookId: workbookid,
        questionQ: qtitle,
        questionA: "0",
        questionType: selectedType,
        questionExplain: qexplian,
        questionDifficulty: qdifficult,
        questionMaker: qmaker,
        questionSave: 1,
        questionImg: null,
      };
      await updateQuestion(question);

      const multipleChoice1 = {
        multipleChoiceId: mcid1,
        questionId: nowQid,
        choiceContent: mccontent1,
        answer: mcisanswer1,
      };
      await updateMulti(multipleChoice1);

      const multipleChoice2 = {
        multipleChoiceId: mcid2,
        questionId: nowQid,
        choiceContent: mccontent2,
        answer: mcisanswer2,
      };
      await updateMulti(multipleChoice2);
      const multipleChoice3 = {
        multipleChoiceId: mcid3,
        questionId: nowQid,
        choiceContent: mccontent3,
        answer: mcisanswer3,
      };
      await updateMulti(multipleChoice3);
      const multipleChoice4 = {
        multipleChoiceId: mcid4,
        questionId: nowQid,
        choiceContent: mccontent4,
        answer: mcisanswer4,
      };
      await updateMulti(multipleChoice4);
      const multipleChoice5 = {
        multipleChoiceId: mcid5,
        questionId: nowQid,
        choiceContent: mccontent5,
        answer: mcisanswer5,
      };
      await updateMulti(multipleChoice5);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  //문제제출단답형,OX용
  const regist1 = async (e) => {
    e.preventDefault();

    try {
      const question = {
        questionId: "",
        workbookId: workbookid,
        questionQ: qtitle,
        questionA: qanswer,
        questionType: qtype,
        questionExplain: qexplian,
        questionDifficulty: qdifficult,
        questionMaker: qmaker,
        questionSave: 1,
        questionImg: null,
      };
      const response = await makeQuestion(question);

      console.log(response.questionId);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  //문제수정단답형,OX용
  const update1 = async (e) => {
    e.preventDefault();

    try {
      const question = {
        questionId: nowQid,
        workbookId: workbookid,
        questionQ: qtitle,
        questionA: qanswer,
        questionType: selectedType,
        questionExplain: qexplian,
        questionDifficulty: qdifficult,
        questionMaker: qmaker,
        questionSave: 1,
        questionImg: null,
      };
      await updateQuestion(question);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  //문제수정용함수들
  // const [nowType, setNowType] = useState();
  const [nowQid, setNowQid] = useState();

  const typeClick = async (questionId) => {
    setShowUpdateForm(true);
    setShowAddForm(false);

    try {
      const response = await questionInfo(questionId);
      const { questionType, questionId: nowQid, ...questionData } = response;

      setNowQid(nowQid);
      setSelectedType(questionType);
      setQtitle(questionData.questionQ);
      setQexplain(questionData.questionExplain);
      setQdifficult(questionData.questionDifficulty);
      setQanswer(questionData.questionA);
      setQmaker(questionData.questionMaker);

      if (questionType === 1) {
        const answer = await answerInfo(questionId);
        answer.forEach((item, index) => {
          mccontents[index](item.choiceContent);
          mcids[index](item.multipleChoiceId);
          mcanswers[index](item.answer);
        });
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 이 함수는 로컬 스토리지에서 사용자 정보를 가져옵니다.
  const getCurrentUser = () => {
    const userString = localStorage.getItem("loginUser");
    // console.log(userString);
    return userString ? JSON.parse(userString) : null;
  };

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData(workbookid);
        setQuestion(data);

        //유저들의 정보를 가져오자.
        const users = await userIngroup(groupid);
        // console.log(users);
        setAlluser(users);
        // 각 생성자에 대한 사용자 정보를 가져옵니다.
        const uniqueCreators = Array.from(new Set(users.map((q) => q.userId)));
        const names = {};
        for (const creator of uniqueCreators) {
          const user = await userName(creator);
          names[creator] = user.userNickname;
        }
        setUserNames(names);

        // 문제집 정보를 가져옵니다.
        const workbookinfo = await workbookInfo(workbookid);
        // console.log("문제집 정보:", workbookinfo);
        setBookInfo(workbookinfo);

        // 토글 상태를 초기화합니다.
        const initialToggleStates = uniqueCreators.reduce(
          (acc, creator) => ({ ...acc, [creator]: false }),
          {}
        );
        setToggleStates(initialToggleStates);

        // 현재 사용자를 설정합니다.
        const currentUser = getCurrentUser();
        // console.log(currentUser);
        setCurrentUser(currentUser.userId);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchDataAndSetState();
  }, [groupid, workbookid]);

  const handleTypeButtonClick = (type) => {
    setSelectedType(type);
    setQtype(+type);
    setQmaker(currentUser);
    setQdifficult();
    setQexplain("");
    setQtitle("");
    setQanswer("");
    setMCcontent1("");
    setMCcontent2("");
    setMCcontent3("");
    setMCcontent4("");
    setMCcontent5("");
    setMCisanswer1(false);
    setMCisanswer2(false);
    setMCisanswer3(false);
    setMCisanswer4(false);
    setMCisanswer5(false);
    console.log(qmaker);
  };
  const Oclick = (e) => {
    e.preventDefault();
    setQanswer(1);
  };
  const Xclick = (e) => {
    e.preventDefault();
    setQanswer(2);
  };
  const checkClick = () => {
    console.log(qmaker);
    console.log("qtype: ", typeof qtype);
  };

  const getQuestionTypeString = (type) => {
    switch (type) {
      case 1:
        return "객관식";
      case 2:
        return "단답형";
      case 3:
        return "O,X";
      default:
        return "알 수 없음";
    }
  };

  const renderUserInfo = (creator) => {
    return userNames[creator] || "";
  };

  const handleToggle = (creator) => {
    setToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [creator]: !prevToggleStates[creator],
    }));
  };

  const getUniqueCreators = (questions) => {
    const uniqueCreators = Array.from(
      new Set(questions.map((q) => q.questionMaker))
    );
    return uniqueCreators;
  };

  const uniqueCreators = getUniqueCreators(question);

  const groupedQuestions = uniqueCreators.map((creator) => ({
    creator,
    questions: question.filter((q) => q.questionMaker === creator),
  }));

  const totalSubmittedQuestions = alluser.reduce((total, user) => {
    const userGroupedQuestions = groupedQuestions.find(
      (group) => group.creator === user.userId
    );
    return total + (userGroupedQuestions?.questions.length || 0);
  }, 0);

  const [showAddForm, setShowAddForm] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  //추가폼으로 보이는곳
  const handleShowAddForm = () => {
    setSelectedType(0);
    setShowAddForm(true);
    setShowUpdateForm(false);
  };

  //업데이트폼으로 보이는 곳
  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
    setShowAddForm(false);
  };

  //문제삭제하기
  const clickDelete = async (e) => {
    await deleteQuestion(e);
    //삭제는 잘 되지만 업데이트가 되지 않음
  };

  return (
    <>
      <Container>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.people}>
              {alluser.map((user) => {
                const userGroupedQuestions = groupedQuestions.find(
                  (group) => group.creator === user.userId
                );
                return (
                  <div key={user.userId} className={styles.문제}>
                    {/*사람이름 */}
                    <div className={styles.이름문제수}>
                      <span
                        className={
                          currentUser === user.userId ? styles.나 : styles.누구
                        }
                      >
                        {renderUserInfo(user.userId)}
                      </span>
                      {/*내가 낸 문제수*/}
                      <span>
                        제출량
                        {userGroupedQuestions?.questions.length || 0}
                      </span>
                    </div>
                    <div className={styles.토글}>
                      <div>
                        {toggleStates[user.userId] &&
                          userGroupedQuestions?.questions.map((q, qIndex) => (
                            <div
                              className={styles.문제리스트}
                              key={qIndex}
                              onClick={() => typeClick(q.questionId)}
                            >
                              <span>{qIndex + 1}번째 문제 </span>
                              <div>
                                유형: {getQuestionTypeString(q.questionType)}
                              </div>
                              <button onClick={() => clickDelete(q.questionId)}>
                                ddd
                              </button>
                            </div>
                          ))}
                        {currentUser === user.userId && (
                          <button onClick={handleShowAddForm}>
                            문제추가하기
                          </button>
                        )}
                      </div>
                      {currentUser === user.userId && (
                        <button onClick={() => handleToggle(user.userId)}>
                          제출문제
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              <p>{bookInfo.workbookTitle}</p>
              <p>{bookInfo.workbookDetail}</p>
              <span>내야하는 문제 {totalSubmittedQuestions} / </span>
              <span>{bookInfo.workbookQuota}</span>
              <p>{bookInfo.workbookDeadline}</p>
            </div>
            <div className={styles.둘중하나만}>
              {showAddForm && (
                <QuestionForm
                  showUpdateForm={showUpdateForm}
                  setShowUpdateForm={setShowUpdateForm}
                  handleShowUpdateForm={handleShowUpdateForm}
                  selectedType={selectedType}
                  handleTypeButtonClick={handleTypeButtonClick}
                  qtitle={qtitle}
                  setQtitle={setQtitle}
                  qdifficult={qdifficult}
                  setQdifficult={setQdifficult}
                  qexplian={qexplian}
                  setQexplain={setQexplain}
                  qanswer={qanswer}
                  setQanswer={setQanswer}
                  qmaker={qmaker}
                  currentUser={currentUser}
                  mccontent1={mccontent1}
                  setMCcontent1={setMCcontent1}
                  mccontent2={mccontent2}
                  setMCcontent2={setMCcontent2}
                  mccontent3={mccontent3}
                  setMCcontent3={setMCcontent3}
                  mccontent4={mccontent4}
                  setMCcontent4={setMCcontent4}
                  mccontent5={mccontent5}
                  setMCcontent5={setMCcontent5}
                  mcisanswer1={mcisanswer1}
                  mcisanswer2={mcisanswer2}
                  mcisanswer3={mcisanswer3}
                  mcisanswer4={mcisanswer4}
                  mcisanswer5={mcisanswer5}
                  handleMCAnswerChange={handleMCAnswerChange}
                  regist0={regist0}
                  regist1={regist1}
                  Oclick={Oclick}
                  Xclick={Xclick}
                  checkClick={checkClick}
                />
              )}
              {showUpdateForm && (
                <UpdateForm
                  selectedType={selectedType}
                  qtitle={qtitle}
                  setQtitle={setQtitle}
                  qdifficult={qdifficult}
                  setQdifficult={setQdifficult}
                  qexplian={qexplian}
                  setQexplain={setQexplain}
                  qanswer={qanswer}
                  setQanswer={setQanswer}
                  qmaker={qmaker}
                  currentUser={currentUser}
                  mccontent1={mccontent1}
                  setMCcontent1={setMCcontent1}
                  mccontent2={mccontent2}
                  setMCcontent2={setMCcontent2}
                  mccontent3={mccontent3}
                  setMCcontent3={setMCcontent3}
                  mccontent4={mccontent4}
                  setMCcontent4={setMCcontent4}
                  mccontent5={mccontent5}
                  setMCcontent5={setMCcontent5}
                  mcisanswer1={mcisanswer1}
                  mcisanswer2={mcisanswer2}
                  mcisanswer3={mcisanswer3}
                  mcisanswer4={mcisanswer4}
                  mcisanswer5={mcisanswer5}
                  handleMCAnswerChange={handleMCAnswerChange}
                  regist0={regist0}
                  regist1={regist1}
                  Oclick={Oclick}
                  Xclick={Xclick}
                  checkClick={checkClick}
                  update0={update0}
                  update1={update1}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
