import styles from "./Regist.module.css";

export default function Regist() {
  return (
    <>
      <div>
        <form>
          <label htmlFor="id">id</label>
          <input type="text" name="id"></input>
          <label htmlFor="pw">pw</label>
          <input type="password" name="pw"></input>
          <label htmlFor="pw">pw확인</label>
          <input type="password" name="pw"></input>
          <label htmlFor="name">이름</label>
          <input type="text" name="name"></input>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" name="nickname"></input>
          <label htmlFor="email">이메일</label>
          <input type="email" name="email"></input>
        </form>
      </div>
    </>
  );
}
