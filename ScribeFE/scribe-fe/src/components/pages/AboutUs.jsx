import suitFord from "../Assets/suitFord.jpg"
import Jacksonpfp from "../Assets/Jackson-pfp.jpg"
import Kate from "../Assets/kate.jpg"
import me from "../Assets/me.png"
import styles from "../../styles/About.module.css"
import StackIcon from "tech-stack-icons";
const About = () => {
    return (
      <div className={styles.aboutContainer}>
        <h1>About Us</h1>
        <h2>Team</h2>
        <div className={styles.container}>
            <div className={styles.person}>
                <img src={Jacksonpfp} alt="Headshot of Jackson Grant. He's smiling, there are trees in the background." width="220" height="220" className={styles.pic}/>
                <h3>Jackson Grant</h3>
                <div className={styles.text}>
                  <p>Project lead, <br></br> Full Stack Developer</p>
                </div>
            </div>
            <div className={styles.person}>
                <img src={suitFord} alt="Headshot of Nithi Pipatkittikul. He's wearing a suit in front of a white background." width="220" height="220" className={styles.pic}/>
                <h3>Nithi Pipatkittikul</h3>
                <div className={styles.text}>
                  <p>Full Stack Developer, <br></br> Database Designer</p>
                </div>
            </div>
            <div className={styles.person}>
                <img src={me} alt="Headshot of Dylan Crooks. He's wearing a suit in front of a white background." width="220" height="220" className={styles.pic} style={{backgroundColor: "white"}}/>
                <h3>Dylan Crooks</h3>
                <div className={styles.text}>
                  <p>Backend Developer, <br></br> Database Designer</p>
                </div>
            </div>
            <div className={styles.person}>
                <img src={Kate} alt="Headshot of Kate Doolittle taken in their apartment." width="220" height="220" className={styles.pic}/>
                <h3>Kate Doolittle</h3>
                <div className={styles.text}>
                  <p>UI/UX Designer, <br></br> Frontend Developer</p>
                </div>
            </div>
        </div>
        <h2>Tech Stack</h2>
        <div className={styles.iconContainer}>
          <div style={{ marginBottom: '1.5rem' }}>
            <StackIcon className="icon" name="mongodb" />
            <p className="stack">Mongo DB</p>
          </div>
           <div style={{ marginBottom: '1.5rem' }}>
            <StackIcon className="icon" name="python" />
            <p className="stack">Python</p>
           </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <StackIcon className="icon" name="js" />
              <p className="stack">Javascript</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <StackIcon className="icon" name="reactjs" />
              <p className="stack">React JS</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <StackIcon className="icon" name="html5" />
              <p className="stack">HTML5</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <StackIcon className="icon" name="css3" />
              <p className="stack">CSS3</p>
            </div>
        </div>
      </div>
    )
  };

export default About;