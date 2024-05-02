import React, {useEffect} from 'react';
import suitFord from "../Assets/suitFord.jpg"
import Jacksonpfp from "../Assets/Jackson-pfp.jpg"
import Kate from "../Assets/kate.jpg"
import me from "../Assets/me.png"
import styles from "../../styles/About.module.css"
import StackIcon from "tech-stack-icons";
import TokenExpireForm from '../TokenExpireForm';


const About = ({isExpire,setIsExpire,getUserToken,checkTokenExpiration}) => {
  // const [isExpire, setIsExpire] = useState(false);

  //   async function getUserToken() {
  //       const token = await localStorage.getItem('token');
  //       return token;
  //   }
  
  //   async function checkTokenExpiration(token) {
  //       const expireTime = apiService.decodeToken(token).exp;
  //       const currentTime = Math.floor(Date.now() / 1000);
        
  //       return currentTime > expireTime;
  //   }
  
    useEffect(() => {
        async function fetchTokenAndCheckExpiration() {
            const token = await getUserToken();
            const isTokenExpired = await checkTokenExpiration(token);
            setIsExpire(isTokenExpired);
        }
        fetchTokenAndCheckExpiration();
    }, []);
    
    return (
      <div>
        { isExpire ? 
        (
          <div>
            <TokenExpireForm/>
          </div>
        )
        :
        (
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
              <p className={styles.stack}>Mongo DB</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <StackIcon className="icon" name="python" />
              <p className={styles.stack}>Python</p>
            </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <StackIcon className="icon" name="js" />
                <p className={styles.stack}>Javascript</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <StackIcon className="icon" name="reactjs" />
                <p className={styles.stack}>React JS</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <StackIcon className="icon" name="html5" />
                <p className={styles.stack}>HTML5</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <StackIcon className="icon" name="css3" />
                <p className={styles.stack}>CSS3</p>
              </div>
          </div>
        </div>
        )
        }
      </div>
    )
  };

export default About;