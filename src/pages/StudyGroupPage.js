import Container from "../components/Container";
import styles from "./StudyGroupPage.module.css";
import { useParams } from "react-router-dom";
import {
  subjectIngroup,
  workbookInsubject,
  userIngroup,
  createSubject,
} from "../api/api";
import { useEffect, useState } from "react";

export default function StudyGroupPage() {
  const { groupid } = useParams();
  console.log(groupid);

  const [subjectG, setSubjectG] = useState([]);
  const [workbookS, setWorkbookS] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [toggleList, setToggleList] = useState([]);

  const [st, setSubjectTitle] = useState("");
  const [sc, setSubjectContent] = useState("");

  const handleRegist = async (e) => {
    e.preventDefault();

    try {
      // 서버로 과목에 대한 정보 보내기
      const subject = {
        groupId: +groupid,
        subjectTitle: st,
        subjectContent: sc,
      };
      const response = await createSubject(subject);
      console.log(response);

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
          console.log("과목별 문제집들:", workbooks);
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
    const fetchData = async () => {
      try {
        // 현재 스터디 그룹의 멤버 목록을 가져옵니다.
        const members = await userIngroup(groupid);
        console.log("스터디내그룹원들:", members);
        setGroupMembers(members);

        // 스터디 그룹의 과목을 가져옵니다.
        const subjects = await subjectIngroup(groupid);
        console.log("스터디내 과목들:", subjects);
        setSubjectG(subjects);

        // 각 과목에 대한 문제집을 가져오기 위한 프로미스 배열을 생성합니다.
        const workbookPromises = subjects.map((subject) => {
          return workbookInsubject(subject.subjectId);
        });

        // 모든 문제집 프로미스가 해결될 때까지 대기하고 상태를 업데이트합니다.
        const workbooks = await Promise.all(workbookPromises);
        console.log("과목별 문제집들:", workbooks);
        setWorkbookS(workbooks);
        // 초기에 모든 소문제집을 닫은 상태로 초기화합니다.
        setToggleList(Array(subjects.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupid]);

  const clickto = (index) => {
    // 특정 소문제집의 토글 상태를 변경합니다.
    const newToggleList = [...toggleList];
    newToggleList[index] = !newToggleList[index];
    setToggleList(newToggleList);
  };

  return (
    <>
      <Container>
        <div className={styles.head}>
          <div>스터디그룹입니다</div>
          <div>
            <button>나의그룹</button>
            <button>그룹설정</button>
            <button>그룹나가기</button>
          </div>
        </div>
        <div className={styles.mainbox}>
          <div className={styles.mainleft}>
            <div className={styles.문제방}>
              <button>문제방 만들기</button>
              <p>생성된 방 리스트</p>
              <div>
                <div className={styles.room}>
                  <div className={styles.roomleft}>
                    <div>방이름</div>
                    <div>문제집이름</div>
                  </div>
                  <div className={styles.roomright}>
                    <div>참여한사람들이미지</div>
                    <div>
                      <button> 4/5 입장하기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.랭킹}>
              <p>랭킹</p>
              <div>
                {groupMembers.map((member, index) => (
                  <div key={index}>
                    <div className={styles.랭킹메인}>
                      <div>
                        <span>{member.userId}</span>
                        <span> 사람이름</span>
                      </div>
                      <div>
                        <span>레벨</span>
                        <span> 푼문제수</span>
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
                <div key={subjectIndex}>
                  <div className={styles.문제리스트헤더}>
                    <div>
                      <p>{subject?.subjectTitle}</p>
                      <p>{subject?.subjectContent}</p>
                    </div>
                    <div className={styles.열고닫기}>
                      <button onClick={() => clickto(subjectIndex)}>
                        {toggleList[subjectIndex] ? "닫기" : "열기"}
                      </button>
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
                              <span>{workbook.workbookContent}</span>
                            </div>
                            <div className={styles.보이거나안보이거나}>
                              <button>문제내러가기버튼</button>
                              <div>
                                <span>
                                  문제를 냈거나 마우스를 올리지 않으면 이미지가
                                  보일거임
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className={styles.문제집생성}>
                        <button>+ 소문제집 추가하기</button>
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
                  <input
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
