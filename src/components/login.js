import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function login() {
  return (
    <>
      <form>
        <label htmlFor="id">id</label>
        <input type="text" name="id"></input>
        <label htmlFor="pw">pw</label>
        <input type="password" name="pw"></input>
        <Link to={"my"}>
          <button>로그인</button>
        </Link>
      </form>
    </>
  );
}
