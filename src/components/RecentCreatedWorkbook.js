import { useState, useEffect } from "react";

const RecentCreatedWorkbook = ({ data }) => {
  return (
    <div>
      <h3>최근에 만들어진 문제집 목록</h3>
      <ul>
        {data && data.map((workbook) => (
          <li key={workbook.workbookId}>{workbook.workbookTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCreatedWorkbook;
