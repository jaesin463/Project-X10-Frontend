import Container from "../components/Container";
import styles from "./StudyGroupPage.module.css";
import Modal from "react-modal";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import {
  subjectIngroup,
  workbookInsubject,
  userIngroup,
  createSubject,
  userGroup,
  allquizroomInfo,
  enterQuizroom,
  makeQuizroom,
  quizroomInfo,
} from "../api/api";
import WorkBookCreate from "../components/WorkBookCreate";
import { useEffect, useState } from "react";
import ex from "../assets/ex.jpeg";
import arrow from "../assets/arrow.png";

export default function StudyGroupPage() {
  const now = new Date();
  console.log(now);
  const navigate = useNavigate(); // useNavigate 훅 추가
  const { groupid } = useParams();

  const [subjectG, setSubjectG] = useState([]);
  const [workbookS, setWorkbookS] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [toggleList, setToggleList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [userGroups, setUserGroups] = useState([]);
  const [nowGroup, setNowGroup] = useState({});

  const [rotation, setRotation] = useState([]);
  const [allquizroom, setAllquizroom] = useState([]);

  const [st, setSubjectTitle] = useState("");
  const [sc, setSubjectContent] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [quizRoomTitle, setQuizRoomTitle] = useState("");
  const [quizRoomWorkbookId, setQuizRoomWorkbookId] = useState("");
  const [quizRoomTimeLimit, setQuizRoomTimeLimit] = useState("");
  const [quizRoomMaxNum, setQuizRoomMaxNum] = useState("");
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "20px",
    },
  };

  const closeModal = () => {
    setModalIsOpen2(false);
    // 모달이 닫힐 때 입력 필드 초기화
    setQuizRoomTitle("");
    setQuizRoomWorkbookId("");
    setQuizRoomTimeLimit("");
    setQuizRoomMaxNum("");
  };

  const handleTitleChange = (e) => {
    setQuizRoomTitle(e.target.value);
  };

  const handleWorkbookIdChange = (e) => {
    setQuizRoomWorkbookId(e.target.value);
  };

  const handleTimeLimitChange = (e) => {
    setQuizRoomTimeLimit(e.target.value);
  };
  const handleMaxChange = (e) => {
    setQuizRoomMaxNum(e.target.value);
  };

  const handleMakeQuizroom = async () => {
    try {
      // Quizroom을 만들기 위한 정보
      const newQuizroom = {
        groupId: groupid,
        quizRoomTitle,
        quizRoomWorkbookId,
        quizRoomTimeLimit,
        quizRoomCreator: loginUser.userId,
        quizRoomMaxNum,
        // 추가로 필요한 정보도 여기에 추가할 수 있음
      };

      // Quizroom 생성 API 호출
      const response = await makeQuizroom(newQuizroom);

      // Quizroom 생성 후 필요한 로직 추가 (예: 페이지 새로고침)

      // 모달 닫기
      closeModal();
      navigate(`/study/${groupid}/${response}/ready`);
    } catch (error) {
      console.error("Quizroom 생성 에러:", error);
    }
  };
  // console.log(workbookS);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // const handlemakeroom = async (newQuizroom) =>{
  //   try{
  //     const updateQuizroom ={
  //       groupId : groupid,
  //       quizRoomTitle :
  //     }
  //   }
  // }

  const enterRoom = async (userId, quizroomId) => {
    try {
      const updateuserQuizroom = {
        userId: userId,
        quizRoomId: quizroomId,
      };

      // await 키워드를 사용하여 Promise 완료를 기다림
      await enterQuizroom(updateuserQuizroom);

      // Promise가 완료된 후에 navigate 함수 호출
      navigate(`/study/${groupid}/${quizroomId}/ready`);
    } catch (error) {
      console.error("Error updating quizroom:", error);
    }
  };

  const nFormatter = (num) => {
    const si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(1).replace(rx, "$1") + si[i].symbol;
  };

  const handleRegist = async (e) => {
    e.preventDefault();

    try {
      // 서버로 과목에 대한 정보 보내기
      const subject = {
        groupId: +groupid,
        subjectTitle: st,
        subjectContent: sc,
      };
      await createSubject(subject);

      // 과목 생성 후 다시 해당 그룹의 과목 목록을 업데이트합니다.
      const updatedSubjects = await subjectIngroup(groupid);
      setSubjectG(updatedSubjects);

      // 새로 생성한 과목에 대한 문제집을 가져오기 위한 프로미스 배열을 생성합니다.
      const workbookPromises = updatedSubjects.map((updatedSubject) => {
        return workbookInsubject(updatedSubject.subjectId);
      });

      // 모든 문제집 프로미스가 해결될 때까지 대기하고 상태를 업데이트합니다.
      Promise.all(workbookPromises)
        .then((workbooks) => {
          // console.log("과목별 문제집들:", workbooks);
          setWorkbookS(workbooks);
          // 초기에 모든 소문제집을 닫은 상태로 초기화합니다.
          setToggleList(Array(updatedSubjects.length).fill(false));
        })
        .catch((error) => {
          console.error("Error fetching workbooks:", error);
        });
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    userGroup(loginUser.userId)
      .then((groups) => {
        setUserGroups(groups);
        for (let g of groups) {
          if (g.groupId === +groupid) {
            setNowGroup(g);
          }
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [loginUser.userId, groupid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //유저의 모든 그룹

        // 현재 스터디 그룹의 멤버 목록을 가져옵니다.
        const members = await userIngroup(groupid);
        // console.log("스터디내그룹원들:", members);
        setGroupMembers(members);

        const allquiz = await allquizroomInfo(groupid);
        // console.log("모든퀴즈룸들 :", allquiz);
        setAllquizroom(allquiz);

        // 스터디 그룹의 과목을 가져옵니다.
        const subjects = await subjectIngroup(groupid);
        // console.log("스터디내 과목들:", subjects);
        setSubjectG(subjects);

        // 각 과목에 대한 문제집을 가져오기 위한 프로미스 배열을 생성합니다.
        const workbookPromises = subjects.map((subject) => {
          return workbookInsubject(subject.subjectId);
        });

        // 모든 문제집 프로미스가 해결될 때까지 대기하고 상태를 업데이트합니다.
        const workbooks = await Promise.all(workbookPromises);
        // console.log("과목별 문제집들:", workbooks);
        setWorkbookS(workbooks);
        // 초기에 모든 소문제집을 닫은 상태로 초기화합니다.
        setToggleList(Array(subjects.length).fill(false));
        setRotation(Array(subjects.length).fill(0));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupid]);

  const clickto = (index) => {
    const newToggleList = [...toggleList];
    const newRotation = [...rotation];
    newToggleList[index] = !newToggleList[index];
    newRotation[index] = newRotation[index] + 180;
    // console.log(newRotation);
    setToggleList(newToggleList);
    setRotation(newRotation);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.groupimgCover}>
          <img src={ex} alt="dd" className={styles.groupimg}></img>
        </div>
        <div className={styles.head}>
          <div className={styles.title}>
            <h1>{nowGroup.groupName} 스터디그룹입니다</h1>
            <p>{nowGroup.groupDetail}</p>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => setToggle(!toggle)}
              className={styles.tranBtn}
            >
              그룹이동
            </button>
            {toggle && (
              <div className={styles.study}>
                <div>내그룹</div>
                {userGroups.map((group, index) => (
                  <div key={index}>
                    {group.groupName !== nowGroup.groupName ? (
                      <Link
                        to={`../../study/${group.groupId}`}
                        onClick={() => setToggle(false)}
                      >
                        <div className={styles.studylist}>
                          <h2 className={styles.groupName}>
                            {group.groupName}
                          </h2>
                          <div>이동하기</div>
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.studylist}>
                        <h2 className={styles.groupName}>{group.groupName}</h2>
                        <div>현위치</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {nowGroup.groupLeaderId === loginUser.userId ? (
              <Link to={"edit"}>
                <button className={styles.editBtn}>그룹설정</button>
              </Link>
            ) : (
              <button className={styles.exitBtn}>그룹나가기</button>
            )}
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.mainbox}>
          <div className={styles.mainleft}>
            <div className={styles.문제방}>
              <button
                onClick={() => setModalIsOpen2(true)}
                className={styles.만들기버튼}
              >
                문제방 만들기
              </button>
              <div>
                {/* 모달 내용 */}
                <Modal
                  appElement={document.getElementById("root")}
                  isOpen={modalIsOpen2}
                  onRequestClose={closeModal}
                  style={modalStyles}
                  contentLabel="Create Quizroom Modal"
                >
                  <h2>문제방 만들기</h2>
                  <div>
                    <label>방 제목:</label>
                    <input
                      type="text"
                      value={quizRoomTitle}
                      onChange={handleTitleChange}
                      placeholder="Quiz Room Title"
                    />
                  </div>
                  <div>
                    <label>문제집 선택:</label>
                    <input
                      type="text"
                      value={quizRoomWorkbookId}
                      onChange={handleWorkbookIdChange}
                      placeholder="문제집 선택"
                    />
                  </div>
                  <div>
                    <label>한 문제당 제한 시간:</label>
                    <input
                      type="text"
                      value={quizRoomTimeLimit}
                      onChange={handleTimeLimitChange}
                      placeholder="한 문제당 제한 시간"
                    />
                  </div>
                  <div>
                    <label>최대 인원 :</label>
                    <input
                      type="text"
                      value={quizRoomMaxNum}
                      onChange={handleMaxChange}
                      placeholder="방 최대 인원"
                    />
                  </div>
                  <button onClick={handleMakeQuizroom}>생성하기</button>
                </Modal>
              </div>
              <hr className={styles.hr}></hr>
              <h3>생성된 방 리스트</h3>
              {allquizroom.map((quizroom, index) => (
                <div key={index}>
                  <div className={styles.room}>
                    <div className={styles.roomleft}>
                      <div className={styles.방이름}>
                        {quizroom.quizRoomTitle}
                      </div>
                      <div className={styles.문제집이름}>
                        문제집번호 : {quizroom.quizRoomWorkbookId}
                      </div>
                    </div>
                    <div className={styles.roomright}>
                      {/* <div>참여한사람들이미지</div> */}
                      <div>
                        {/* <Link to={quizroom.quizRoomId + "/ready"}> */}
                        <button
                          onClick={() =>
                            enterRoom(loginUser.userId, quizroom.quizRoomId)
                          }
                          className={styles.방버튼}
                        >
                          {quizroom.quizRoomCurrentP}/{quizroom.quizRoomMaxNum}{" "}
                          입장하기
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.랭킹}>
              <p>랭킹</p>
              <div>
                {groupMembers.map((member, index) => (
                  <div key={index}>
                    <div className={styles.랭킹메인}>
                      <div className={styles.랭킹개인정보}>
                        <span>
                          {member.userId}
                          {member.isOnline ? (
                            <span className={styles.onDot}></span>
                          ) : (
                            <span className={styles.offDot}></span>
                          )}
                        </span>
                      </div>
                      <div className={styles.랭킹레벨정보}>
                        <span className={styles.레벨}>
                          {" "}
                          Lv.{member.userLevel}
                        </span>
                        <span className={styles.경험치}>
                          {" "}
                          Exp {nFormatter(member.userSolvedQuestion)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.mainright}>
            <div className={styles.문제리스트}>
              {subjectG.map((subject, subjectIndex) => (
                <div key={subjectIndex} className={styles.과목}>
                  <div className={styles.문제리스트헤더}>
                    <div>
                      <div className={styles.과목제목}>
                        {subject?.subjectTitle}
                      </div>
                      <div className={styles.과목설명}>
                        {subject?.subjectContent}
                      </div>
                    </div>
                    <div className={styles.열고닫기}>
                      <div>
                        <button>수정</button>
                        <button>삭제</button>
                      </div>
                      <img
                        className={styles.여닫이}
                        src={arrow}
                        alt="arrow"
                        onClick={() => {
                          clickto(subjectIndex);
                        }}
                        width="30"
                        height="30"
                        value={rotation}
                        style={{
                          transform: `rotate(${rotation[subjectIndex]}deg)`,
                          transition: "transform 0.3s ease-in-out",
                        }}
                      ></img>
                    </div>
                  </div>
                  {toggleList[subjectIndex] && (
                    <div className={styles.소문제집전체}>
                      {workbookS[subjectIndex]?.map(
                        (workbook, workbookIndex) => (
                          <div
                            key={workbookIndex}
                            className={styles.소문제집틀}
                          >
                            <div className={styles.소문제집메인}>
                              <span>{workbook.workbookTitle}</span>
                              <span>{workbook.workbookDetail}</span>
                              <span>{workbook.workbookDeadline}까지</span>
                              <span>총 {workbook.workbookQuota}문제</span>
                            </div>
                            <div className={styles.보이거나안보이거나}>
                              {new Date(workbook.workbookDeadline) > now && (
                                <Link to={`${workbook.workbookId}`}>
                                  <button>문제내러가기버튼</button>
                                </Link>
                              )}
                              <div>
                                {/* <span>
                                  문제를 냈거나 마우스를 올리지 않으면 이미지가
                                  보일거임
                                </span> */}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className={styles.문제집생성}>
                        <button onClick={() => setModalIsOpen(true)}>
                          + 소문제집 추가하기
                        </button>
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
                          <WorkBookCreate
                            groupId={groupid}
                            subjectId={subject.subjectId}
                            setModalIsOpen={setModalIsOpen}
                            setWorkbookS={setWorkbookS}
                            workbookS={workbookS}
                          />
                        </Modal>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.문제집생성}>
              <form onSubmit={handleRegist} className={styles.form}>
                <div className={styles.regist_div}>
                  <input
                    placeholder=" "
                    type="text"
                    name="subjectTitle"
                    value={st}
                    onChange={(e) => setSubjectTitle(e.target.value)}
                    className={styles.input}
                  />
                  <label htmlFor=" " className={styles.label}>
                    문제집이름
                  </label>
                </div>
                <div className={styles.regist_div}>
                  <textarea
                    placeholder=" "
                    type="text"
                    name="subjectContent"
                    value={sc}
                    onChange={(e) => setSubjectContent(e.target.value)}
                    className={styles.input}
                  />
                  <label htmlFor=" " className={styles.label}>
                    문제집설명
                  </label>
                </div>
                <input
                  type="submit"
                  className={styles.button}
                  value="문제집생성"
                />
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
