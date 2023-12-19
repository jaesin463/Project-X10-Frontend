import { useState } from "react";
import Login from "../components/login";
import Legist from "../components/regist";

export default function WelcomePage() {
  const [login, setLogin] = useState(true);
  const change = () => {
    setLogin(!login);
  };
  return (
    <>
      <div>
        {login ? (
          <div>
            <Login />
            <p>혹시 아직 회원이 아니신가요?</p>
            <button onClick={change}>회원가입</button>
          </div>
        ) : (
          <div>
            <Legist />
            <p>혹시 이미 회원이신가요?</p>
            <button onClick={change}>로그인</button>
          </div>
        )}
        웰컴페이지입니다.
      </div>
    </>
  );
}
