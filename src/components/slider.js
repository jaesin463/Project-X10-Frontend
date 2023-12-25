import styles from "./Slider.module.css";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";

export default function Slider() {
  return (
    <>
      <div className={styles.slider}>
        <img className={styles.slide} src={slide1} alt="slide1"></img>
        <img className={styles.slide} src={slide2} alt="slide2"></img>
        <img className={styles.slide} src={slide3} alt="slide3"></img>
      </div>
    </>
  );
}
