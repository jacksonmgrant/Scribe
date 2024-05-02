import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';
import React, {useEffect} from 'react';
import TokenExpireForm from '../TokenExpireForm';

const Userpage =  ({isExpire,setIsExpire,getUserToken,checkTokenExpiration}) => {
    // const [isExpire, setIsExpire] = useState(false);

    // async function getUserToken() {
    //     const token = await localStorage.getItem('token');
    //     return token;
    // }
  
    // async function checkTokenExpiration(token) {
    //     const expireTime = apiService.decodeToken(token).exp;
    //     const currentTime = Math.floor(Date.now() / 1000);
        
    //     return currentTime > expireTime;
    // }
  
    useEffect(() => {
        async function fetchTokenAndCheckExpiration() {
            const token = await getUserToken();
            const isTokenExpired = await checkTokenExpiration(token);
            setIsExpire(isTokenExpired);
        }
        fetchTokenAndCheckExpiration();
    }, []);

    return( 
        <div>
            { isExpire ? 
            (
                <div>
                    <TokenExpireForm/>
                </div>
            )
            : (
                <div className="home-container">
                    <Header className="App-header"/>
                    <NoteManager />
                </div>
            )
            }
        </div>  
    )
}

export default Userpage;