import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import Footer from "./Footer";
import styles from './App.module.css';
import './App.font.css';

function App({ children }) {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}><Outlet/></div>
      <Footer className={styles.footer} />
    </>
  );
}

export default App;
