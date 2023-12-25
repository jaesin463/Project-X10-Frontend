import React, { useEffect, useRef } from "react";
import ProgressBar from "progressbar.js";

const Progress = ({ persent }) => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    // SVG를 감싸는 div에 대한 참조 생성
    const container = progressBarRef.current;

    // progressbar.js 초기화
    const progressBar = new ProgressBar.Path(container.querySelector("#path"), {
      easing: "easeInOut",
      duration: 1400,
    });

    // 원하는 값으로 업데이트
    progressBar.set(0.0); // 예시로 70%로 설정
    progressBar.animate(persent + 0.01); // Number from 0.0 to 1.0

    // // 언마운트 시에 정리
    // return () => {
    //   progressBar.destroy();
    // };
  }, [persent]);

  return (
    <div id="container" ref={progressBarRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="-10 -10 120 120"
      >
        <svg
          width="100"
          height="100"
          viewBox="-10 -10 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            fillOpacity="0"
            strokeWidth="1"
            stroke="#d3e6fe"
            d="M99 50C99 77.062 77.062 99 50 99C22.938 99 1 77.062 1 50C1 22.938 22.938 1 50 1"
          />
          <path
            id="path"
            strokeLinecap="round"
            fillOpacity="0"
            strokeWidth="10"
            stroke="#d946ef"
            d="M99 50C99 77.062 77.062 99 50 99C22.938 99 1 77.062 1 50C1 22.938 22.938 1 50 1"
          />
        </svg>
      </svg>
    </div>
  );
};

export default Progress;
