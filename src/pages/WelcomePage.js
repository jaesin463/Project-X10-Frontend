import { useState } from "react";
import Container from "../components/Container";
import Login from "../components/Login";
import Regist from "../components/Regist";

export default function WelcomePage() {
  const [login, setLogin] = useState(true);
  const change = () => {
    setLogin(!login);
  };
  return (
    <>
      <Container>
        {login ? (
          <div>
            <Login />
            <p>혹시 아직 회원이 아니신가요?</p>
            <button onClick={change}>회원가입</button>
          </div>
        ) : (
          <div>
            <Regist />
            <p>혹시 이미 회원이신가요?</p>
            <button onClick={change}>로그인</button>
          </div>
        )}
        웰컴페이지입니다.
      </Container>
    </>
  );
}
