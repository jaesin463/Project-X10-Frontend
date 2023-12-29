import { useState } from "react";
import "./RecentSolvedWorkbook.css";

const RecentSolvedWorkbook = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="recent-solved-workbook">
      <h3>최근에 푼 문제집 목록</h3>
      <div className="carousel">
        {data && data.length > 0 && (
          <div className="workbook">
            <h4>{data[currentIndex].workbookTitle}</h4>
            {/* 여기에 문제집 정보를 보여주는 내용 추가 */}
          </div>
        )}
      </div>
      <button onClick={handlePrev}>이전</button>
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default RecentSolvedWorkbook;
