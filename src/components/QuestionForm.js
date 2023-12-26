// QuestionForm.js

import React from "react";
import styles from "../pages/QuestionCreatePage.module.css";

const QuestionForm = ({
  selectedType,
  handleTypeButtonClick,
  qtitle,
  setQtitle,
  qanswer,
  setQanswer,
  qdifficult,
  setQdifficult,
  qexplian,
  setQexplain,
  qmaker,
  currentUser,
  mccontent1,
  setMCcontent1,
  mccontent2,
  setMCcontent2,
  mccontent3,
  setMCcontent3,
  mccontent4,
  setMCcontent4,
  mccontent5,
  setMCcontent5,
  mcisanswer1,
  mcisanswer2,
  mcisanswer3,
  mcisanswer4,
  mcisanswer5,
  handleMCAnswerChange,
  regist0,
  regist1,
  Oclick,
  Xclick,
  checkClick,
}) => {
  return (
    <div className={styles.make}>
      <div>문제내는페이지입니당</div>
      <div>
        <button onClick={() => handleTypeButtonClick(1)}>객관식</button>
        <button onClick={() => handleTypeButtonClick(2)}>단답식</button>
        <button onClick={() => handleTypeButtonClick(3)}>O.X</button>
      </div>

      {selectedType === 1 && (
        <form onSubmit={regist0}>
          {/* Form for 객관식 */}
          <div>
            <label>문제</label>
            <input
              placeholder=" "
              type="text"
              name="questionQ"
              value={qtitle}
              onChange={(e) => setQtitle(e.target.value)}
            />
          </div>

          <div>
            {/* 난이도 선택 */}
            <label>난이도</label>
            <div className={styles.difficultyButtons}>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className={styles.레벨라벨}>
                  <div className={styles.difficultyButton}>{level}</div>
                  <input
                    type="radio"
                    name="questionDifficulty"
                    value={level}
                    checked={qdifficult === level}
                    onChange={() => setQdifficult(level)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className={styles.문제내기창}>
            {/* 객관식 보기를 만드는 창 */}
            <div>
              <label>1번</label>
              <input
                type="radio"
                name="questionA"
                checked={mcisanswer1 === true}
                onChange={() => handleMCAnswerChange(1)}
                value={mcisanswer1}
              />
              <input
                placeholder=" "
                type="text"
                name="choiceContent"
                value={mccontent1}
                onChange={(e) => setMCcontent1(e.target.value)}
              />
            </div>
            <div>
              <label>2번</label>
              <input
                type="radio"
                name="questionA"
                checked={mcisanswer2 === true}
                onChange={() => handleMCAnswerChange(2)}
                value={mcisanswer2}
              />
              <input
                placeholder=" "
                type="text"
                name="choiceContent"
                value={mccontent2}
                onChange={(e) => setMCcontent2(e.target.value)}
              />
            </div>
            <div>
              <label>3번</label>
              <input
                type="radio"
                name="questionA"
                checked={mcisanswer3 === true}
                onChange={() => handleMCAnswerChange(3)}
                value={mcisanswer3}
              />
              <input
                placeholder=" "
                type="text"
                name="choiceContent"
                value={mccontent3}
                onChange={(e) => setMCcontent3(e.target.value)}
              />
            </div>
            <div>
              <label>4번</label>
              <input
                type="radio"
                name="questionA"
                checked={mcisanswer4 === true}
                onChange={() => handleMCAnswerChange(4)}
                value={mcisanswer4}
              />
              <input
                placeholder=" "
                type="text"
                name="choiceContent"
                value={mccontent4}
                onChange={(e) => setMCcontent4(e.target.value)}
              />
            </div>
            <div>
              <label>5번</label>
              <input
                type="radio"
                name="questionA"
                checked={mcisanswer5 === true}
                onChange={() => handleMCAnswerChange(5)}
                value={mcisanswer5}
              />
              <input
                placeholder=" "
                type="text"
                name="choiceContent"
                value={mccontent5}
                onChange={(e) => setMCcontent5(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>해설</label>
            <input
              placeholder=" "
              type="text"
              name="questionExplain"
              value={qexplian}
              onChange={(e) => setQexplain(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" className={styles.button} value="문제생성" />
          </div>
        </form>
      )}
      <button onClick={() => checkClick()}>체크</button>

      {selectedType === 2 && (
        <form onSubmit={regist1}>
          {/* Form for 단답식 */}
          <div>
            <label>문제</label>
            <input
              placeholder=" "
              type="text"
              name="questionQ"
              value={qtitle}
              onChange={(e) => setQtitle(e.target.value)}
            />
          </div>
          <div>
            {/* 난이도 선택 */}
            <label>난이도</label>
            <div className={styles.difficultyButtons}>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className={styles.레벨라벨}>
                  <div className={styles.difficultyButton}>{level}</div>
                  <input
                    type="radio"
                    name="questionDifficulty"
                    value={level}
                    checked={qdifficult === level}
                    onChange={() => setQdifficult(level)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            {/* 단답식 답 입력창 */}
            <label>답</label>
            <input
              placeholder=" "
              type="text"
              name="questionA"
              value={qanswer}
              onChange={(e) => setQanswer(e.target.value)}
            />
          </div>
          <div>
            <label>해설</label>
            <input
              placeholder=" "
              type="text"
              name="questionExplain"
              value={qexplian}
              onChange={(e) => setQexplain(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" className={styles.button} value="문제생성" />
          </div>
        </form>
      )}

      {selectedType === 3 && (
        <form onSubmit={regist1}>
          {/* Form for O.X */}
          <div>
            <label>문제</label>
            <input
              placeholder=" "
              type="text"
              name="questionQ"
              value={qtitle}
              onChange={(e) => setQtitle(e.target.value)}
            />
          </div>
          <div>
            {/* 난이도 선택 */}
            <label>난이도</label>
            <div className={styles.difficultyButtons}>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className={styles.레벨라벨}>
                  <div className={styles.difficultyButton}>{level}</div>
                  <input
                    type="radio"
                    name="questionDifficulty"
                    value={level}
                    checked={qdifficult === level}
                    onChange={() => setQdifficult(level)}
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            {/* O.X 중 하나를 선택하는 창 */}
            <button onClick={Oclick}>O</button>
            <button onClick={Xclick}>X</button>
          </div>
          <div>
            <label>해설</label>
            <input
              placeholder=" "
              type="text"
              name="questionExplain"
              value={qexplian}
              onChange={(e) => setQexplain(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" className={styles.button} value="문제생성" />
          </div>
        </form>
      )}
    </div>
  );
};

export default QuestionForm;
