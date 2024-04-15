import suitFord from "../Assets/suitFord.jpg"
import Jacksonpfp from "../Assets/Jackson-pfp.jpg"
import Kate from "../Assets/kate.jpg"
import me from "../Assets/me.png"
import styles from "../../styles/About.module.css"

const About = () => {
    return (
      <div className={styles.aboutContainer}>
        <h1>About Us</h1>
        <div className={styles.container}>
        <div className={styles.person}>
          <img src={Jacksonpfp} alt="Jackson Grant" width="220" height="220" className={styles.pic}/>
          <h2>Jackson Grant</h2>
          <div className={styles.text}>
            <p>Project lead, <br></br> Full Stack Developer</p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={suitFord} alt="ford" width="220" height="220" className={styles.pic}/>
          <h2>Nithi Pipatkittikul</h2>
          <div className={styles.text}>
            <p>Full Stack Developer, <br></br> Database Designer</p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={Kate} alt="kate" width="220" height="220" className={styles.pic}/>
          <h2>Kate Doolittle</h2>
          <div className={styles.text}>
            <p>UI/UX Designer, <br></br> Frontend Developer</p>
          </div>
        </div>
        <div className={styles.person}>
          <img src={me} alt="dylan" width="220" height="220" className={styles.pic} style={{backgroundColor: "white"}}/>
          <h2>Dylan Crooks</h2>
          <div className={styles.text}>
            <p>Backend Developer, <br></br> Database Designer</p>
          </div>
        </div>
      </div>
    </div>
    )
  };

export default About;