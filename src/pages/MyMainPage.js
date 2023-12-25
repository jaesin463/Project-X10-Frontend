import Container from "../components/Container";
import ToDoList from "../components/ToDoList";
import Progress from "../components/Progress";
import styles from "./MyMainPage.module.css";
import ex from "../assets/ex.jpeg";
import classNames from "classnames";
import { userGroup, userIngroup } from "../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import plus from "../assets/plus.png";
import StudyGroupCreate from "../components/StudyGroupCreate";
import Slider from "../components/slider";

export default function MyMainPage() {
  const [userGroups, setUserGroups] = useState([]);
  const [groupMembers, setGroupMembers] = useState({});
  const [focus, setFocus] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // 그룹들어가는 함수

  useEffect(() => {
    userGroup(loginUser.userId)
      .then((groups) => {
        // console.log("유저가 속한 그룹들:", groups);
        setUserGroups(groups);

        // 각 그룹에 대한 추가적인 정보 가져오기
        const memberPromises = groups.map((group) => {
          return userIngroup(group.groupId)
            .then((groupInfo) => {
              // console.log(`그룹 ${group.groupId}의 멤버 정보:`, groupInfo);
              setGroupMembers((prevMembers) => ({
                ...prevMembers,
                [group.groupId]: groupInfo,
              }));
              // 여기서 groupInfo를 활용하여 필요한 작업 수행
            })
            .catch(
              (error) => {
                console.error(
                  `그룹 ${group.groupId}의 멤버 정보를 가져오는 중 에러:`,
                  error
                );
              },
              // 그룹정보가 바뀔때마다 업데이트 할껀데 일단 미정ㅋ
              [groups]
            );
        });

        // 모든 그룹의 멤버 정보를 가져온 후에 로직 수행
        Promise.all(memberPromises)
          .then(() => {
            // console.log("모든 그룹의 멤버 정보를 가져왔습니다.");
          })
          .catch((error) => {
            console.error("모든 그룹의 멤버 정보를 가져오는 중 에러:", error);
          });
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [loginUser.userId]);

  return (
    <>
      <Container>
        <div className={styles.FlexColumn}>
          <h1>{loginUser.userName}님 환영합니다.</h1>
          <div className={styles.cara}>
            <Slider />
          </div>
          <div className={styles.FlexRow}>
            <div className={styles.qustion}>
              <h3>최근 푼 문제 | 예정 된 문제</h3>
              <div></div>
            </div>
            <div
              className={styles.level}
              onMouseOver={() => setFocus(true)}
              onMouseOut={() => setFocus(false)}
            >
              <Progress persent={(loginUser.userSolvedQuestion % 100) * 0.01} />
              <p className={styles.lv}>
                Lv. {Math.floor(loginUser.userSolvedQuestion / 100) + 1}
              </p>
              <p className={styles.nextLv}>
                {(Math.floor(loginUser.userSolvedQuestion / 100) + 1) * 100}
              </p>
              <p className={styles.prevLv}>
                {Math.floor(loginUser.userSolvedQuestion / 100) * 100}
              </p>
              {focus && (
                <div className={styles.lvBox}>
                  <p className={styles.sq}>
                    {" "}
                    푼 문제 수 : {loginUser.userSolvedQuestion}
                  </p>
                </div>
              )}
            </div>
          </div>
          <h2 className={styles.list}>스터디그룹 목록</h2>
          <div className={styles.study}>
            {userGroups.map((group, index) => (
              <Link to={`../../study/${group.groupId}`} key={index}>
                <div className={styles.studylist}>
                  <div className={styles.groupimgCover}>
                    <img
                      src={ex}
                      alt={group.groupName}
                      className={styles.groupimg}
                    ></img>
                    <h2 className={styles.groupName}>{group.groupName}</h2>
                  </div>
                  <p>{group.groupDetail}</p>
                  {groupMembers[group.groupId] && (
                    <div>
                      <p>{groupMembers[group.groupId].length}/8</p>
                      {groupMembers[group.groupId].map((user, userIndex) => (
                        <span key={userIndex}>{user.userId} </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            {userGroups.length < 10 && (
              <>
                <div
                  className={styles.studyadd}
                  onClick={() => setModalIsOpen(true)}
                >
                  <p>새로운 스터디그룹 만들기</p>
                  <img
                    src={plus}
                    alt="plus"
                    width="50px"
                    height="50px"
                    className={styles.img}
                  ></img>
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
                  <StudyGroupCreate
                    userId={loginUser.userId}
                    setModalIsOpen={setModalIsOpen}
                    setUserGroups={setUserGroups}
                    userGroups={userGroups}
                  />
                </Modal>
              </>
            )}
          </div>
          <h2>투두리스트</h2>
          <div className={classNames(styles.todo)}>
            <ToDoList userId={loginUser.userId} />
          </div>
        </div>
      </Container>
    </>
  );
}
