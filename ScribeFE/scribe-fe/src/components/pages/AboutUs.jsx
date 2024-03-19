import suitFord from "../Assets/suitFord.jpg"
import Jacksonpfp from "../Assets/Jackson-pfp.jpg"
import styles from "../../styles/About.module.css"

const About = () => {
    return (
      <div className={styles.container}>
        <div className={styles.person}>
          <img src={suitFord} alt="ford" width="200" height="200" className={styles.pic}/>
          <div className={styles.text}>
            <h2> Nithi Pipatkittikul </h2>
            <p> role : developing frontend</p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={Jacksonpfp} alt="Jackson Grant" width="200" height="200" className={styles.pic}/>
          <div className={styles.text}>
            <h2> Jackson Grant </h2>
            <p> role : Does things </p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={suitFord} alt="ford" width="200" height="200" className={styles.pic}/>
          <div className={styles.text}>
            <h2> ????????? </h2>
            <p> role : ?????????</p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={suitFord} alt="ford" width="200" height="200" className={styles.pic}/>
          <div className={styles.text}>
            <h2> ????????? </h2>
            <p> role : ?????????</p>
          </div>
        </div>
      </div>
    )
  };

export default About;