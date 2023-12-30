const BASE_URL = "http://localhost:8080";

// 로그인
export async function loginUser(user) {
  try {
    const response = await fetch(BASE_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 회원가입
export async function signupUser(user) {
  try {
    const response = await fetch(BASE_URL + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 회원정보 수정
export async function editUser(user) {
  try {
    const response = await fetch(BASE_URL + "/users/update", {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//유저가 속한 그룹들 조회
export async function userGroup(userid) {
  try {
    const response = await fetch(BASE_URL + "/groups/readAll/" + userid, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//그룹 내 유저 전체조회
export async function userIngroup(groupid) {
  try {
    const response = await fetch(
      BASE_URL + "/groups/readAllMember/" + groupid,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//스터디내 과목조회
export async function subjectIngroup(groupid) {
  try {
    const response = await fetch(BASE_URL + "/subject/readAll/" + groupid, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//과목내소문제집조회
export async function workbookInsubject(subjectid) {
  try {
    const response = await fetch(BASE_URL + "/workbook/readAll/" + subjectid, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 과목생성
export const createSubject = async (subject) => {
  try {
    const response = await fetch(BASE_URL + "/subject/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });

    // 서버에서 오류 응답 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // // 정상적인 경우 응답 데이터 반환
    // return response.json();
  } catch (error) {
    throw new Error("Error creating subject: " + error.message);
  }
};

//todolist
export async function getToDoList(userId) {
  try {
    const response = await fetch(BASE_URL + "/todolist/AllTodo/" + userId, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function addToDoList(todo) {
  try {
    const response = await fetch(BASE_URL + "/todolist/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateToDoList(todo) {
  try {
    const response = await fetch(BASE_URL + "/todolist/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function deleteToDoList(todo) {
  try {
    const response = await fetch(BASE_URL + "/todolist/delete/" + todo, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 그룹생성
export async function groupCreate(group, groupImg) {
  try {
    const response = await fetch(BASE_URL + "/groups/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });

    const data = await response.json();
    console.log(data);

    const response2 = await fetch(BASE_URL + "/groups/updateProfile/" + data, {
      method: "POST",
      body: groupImg,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (!response2.ok) {
      throw new Error(`HTTP error! Status: ${response2.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//워크북안에 퀴즈조회
export async function questionInworkbook(workbookid) {
  try {
    const response = await fetch(BASE_URL + "/question/readAll/" + workbookid, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//유저이름을 가져오고싶어서 만든 api
export async function userName(userid) {
  try {
    const response = await fetch(BASE_URL + "/users/read/" + userid, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//워크북정보가져오기
export async function workbookInfo(workbookid) {
  try {
    const response = await fetch(BASE_URL + "/workbook/read/" + workbookid, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//소문제집 생성
export async function WorkBookCreates(workbook, groupId) {
  try {
    const response = await fetch(BASE_URL + "/workbook/create/" + groupId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workbook),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//퀴즈생성
export async function makeQuestion(question) {
  try {
    const response = await fetch(BASE_URL + "/question/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 서버로부터 반환된 JSON 데이터를 파싱하고 반환
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//객관식선지생성
export async function makeMultipleChoice(multipleChoice) {
  try {
    const response = await fetch(BASE_URL + "/multiplechoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(multipleChoice),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈상세정보
export async function questionInfo(questionId) {
  try {
    const response = await fetch(BASE_URL + "/question/read/" + questionId, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//객관식상세정보
export async function answerInfo(questionId) {
  try {
    const response = await fetch(
      BASE_URL + "/multiplechoice/readAll/" + questionId,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//객관식답안수정
export async function updateMulti(multipleChoice) {
  try {
    const response = await fetch(
      BASE_URL + "/multiplechoice/update/" + multipleChoice.multipleChoiceId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(multipleChoice),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("잘 업뎃됨ㅋ");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//문제수정
export async function updateQuestion(question) {
  try {
    console.log("문제수정하려고하는 문제정보 :", question);
    const response = await fetch(BASE_URL + "/question/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "HTTP error! Status:",
        response.status,
        "Error:",
        errorText
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("잘 업뎃됨ㅋ");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//문제삭제하기
export async function deleteQuestion(questionId) {
  try {
    const response = await fetch(BASE_URL + "/question/delete/" + questionId, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸준비방에 있는 사람들을 조회하자
export async function quizreadyroomInfomember(quizRoomId) {
  try {
    const response = await fetch(
      BASE_URL + "/userquizroom/userAll/" + quizRoomId,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸에대한 정보를 가져오자
export async function quizroomInfo(quizRoomId) {
  try {
    const response = await fetch(BASE_URL + "/quizroom/detail/" + quizRoomId, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//유저강퇴하기, 나가기
export async function quizroomexit(quizRoomId, userId) {
  try {
    const response = await fetch(
      BASE_URL + "/userquizroom/" + quizRoomId + "/delete/" + userId,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸업데이트
export async function updateQuizroom(quizRoom) {
  try {
    const response = await fetch(BASE_URL + "/quizroom/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizRoom),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("잘 업뎃됨ㅋ");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//준비를해보자
export async function readyUser(userId) {
  try {
    const response = await fetch(BASE_URL + "/userquizroom/isReady/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("레디완료");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//모든퀴즈룸들을다 가져와보자
export async function allquizroomInfo(groupId) {
  try {
    const response = await fetch(BASE_URL + "/quizroom/readAll/" + groupId, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸입장
export async function enterQuizroom(userQuizRoom) {
  try {
    const response = await fetch(BASE_URL + "/userquizroom/enter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userQuizRoom),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸삭제
export async function quizroomDelete(quizRoomId) {
  try {
    const response = await fetch(BASE_URL + "/quizroom/delete/" + quizRoomId, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//퀴즈룸만들기
export async function makeQuizroom(quizRoom) {
  try {
    const response = await fetch(BASE_URL + "/quizroom/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizRoom),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//유저 프로필 업데이트
export async function profileUpdate(formData, user) {
  // API 호출 및 응답 처리
  const response = await fetch(`${BASE_URL}/users/updateProfile/${user}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("프로필을 업데이트하는데에 실패했습니다.");
  }

  const data = await response.json();
  return data;
}

//최근에 푼 문제집
export async function getRecentSolvedWorkbooksByUserId(userId) {
  try {
    const response = await fetch(
      BASE_URL + "/workbook/recentSolved/" + userId,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//최근에 만들어진 문제집
export async function getRecentCreatedWorkbooksByUserId(userId) {
  try {
    const response = await fetch(
      BASE_URL + "/workbook/recentCreated/" + userId,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 과목 삭제
export async function subjectDelete(subjectId) {
  try {
    const response = await fetch(BASE_URL + "/subject/delete/" + subjectId, {
      method: "DELETE",
    });
   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//유저퀴즈답안지 조회
export async function getUserquizrecord(workbookId, userId) {
  try {
    const response = await fetch(
      BASE_URL + "/userquestionrecord/read/" + workbookId + "/user/" + userId,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//멤버검색
export async function searchMember(keyword, groupid) {
  try {
    const response = await fetch(
      BASE_URL + "/users/search/" + keyword + "/" + groupid,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data;
    if (response.status === 204) {
      data = [];
    } else {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//문제집스타트했을때 시작시간넣자
export async function setStart(quizRoomId) {
  try {
    const response = await fetch(
      BASE_URL + "/userquizroom/setStartTime/" + quizRoomId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizRoomId),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("레디완료");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//userquizroom에서 시간을 가져오자
export async function getTime(userId) {
  try {
    const response = await fetch(
      BASE_URL + "/userquizroom/getStartTime/" + userId,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // .json() 메서드 사용하지 않음
    const data = await response.text();
    // 문자열로 데이터를 받아옴
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//하나의 그룹 가져오기
export async function readGroup(groupId) {
  try {
    const response = await fetch(BASE_URL + "/groups/read/" + groupId, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//그룹초대
export async function groupInvite(userid, groupid) {
  try {
    const response = await fetch(
      BASE_URL + "/groups/" + groupid + "/invite/" + userid,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//답안 보내기
export async function AddAnswer(answer) {
  try {
    const response = await fetch(BASE_URL + "/userquestionrecord/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("답보냄");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
