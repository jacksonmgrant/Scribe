import FormSubmission from "../Formsubmission";
import TokenExpireForm from '../TokenExpireForm';
import React, {useEffect} from 'react';


const FormSubmissionPage = ({isExpire,setIsExpire,getUserToken,checkTokenExpiration}) =>{
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
                <div>
                    <FormSubmission/>
                </div>
            )
            }
        </div>
    )
}

export default FormSubmissionPage;