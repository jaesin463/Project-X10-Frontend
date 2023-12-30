import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecentWorkbook.module.css";
import left from "../assets/left.png";
import right from "../assets/right.png";

const RecentCreatedWorkbook = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNavigate = () => {
    // 문제 내러가기 페이지로 이동
    navigate(
      `/study/${data[currentIndex].subjectId}/${data[currentIndex].workbookId}`
    );
  };

  return (
    <div className={styles.recentworkbook}>
      <h3>최근에 만들어진 문제집 목록</h3>
      <div className={styles.carouselContainer}>
        <div>
          <img
            className={styles.캐러셀버튼}
            onClick={handlePrev}
            src={left}
            alt="Previous"
          />
        </div>
        <div className={styles.carousel}>
          {data && data.length > 0 && (
            <div className={styles.workbook} onClick={handleNavigate}>
              {/* 그룹이름이랑 과목이름은 나중에 가져오자^^ */}
              <div>문제집 이름 : {data[currentIndex].workbookTitle}</div>
              <div>문제집 설명 : {data[currentIndex].workbookDetail}</div>
              <div>문제 제출 기한 : {data[currentIndex].workbookDeadline}</div>
            </div>
          )}
        </div>
        <div>
          <img
            className={styles.캐러셀버튼}
            onClick={handleNext}
            src={right}
            alt="Next"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentCreatedWorkbook;
