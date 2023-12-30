import { useState } from "react";
import styles from "./RecentWorkbook.module.css";
import left from "../assets/left.png";
import right from "../assets/right.png";

const RecentCreatedWorkbook = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
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
            <div className={styles.workbook}>
              <h4>{data[currentIndex].workbookTitle}</h4>
              {/* 여기에 문제집 정보를 보여주는 내용 추가 */}
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
