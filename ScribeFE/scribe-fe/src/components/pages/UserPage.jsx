import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';
import React, {useEffect} from 'react';
import TokenExpireForm from '../TokenExpireForm';

const Userpage =  ({isExpire,setIsExpire,getUserToken,checkTokenExpiration}) => {
  
    useEffect(() => {
        async function fetchTokenAndCheckExpiration() {
            const token = await getUserToken();
            const isTokenExpired = await checkTokenExpiration(token);
            setIsExpire(isTokenExpired);
        }
        fetchTokenAndCheckExpiration();
    }, [getUserToken, checkTokenExpiration, setIsExpire]);

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