import { useEffect, useState } from "react";

const RecentSolvedWorkbook = ({ data }) => {
  return (
    <div>
      <h3>최근에 푼 문제집 목록</h3>
      <ul>
        {data && data.map((workbook) => (
          <li key={workbook.workbookId}>{workbook.workbookTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSolvedWorkbook;
