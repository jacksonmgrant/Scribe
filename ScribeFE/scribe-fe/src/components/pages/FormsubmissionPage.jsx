import FormSubmission from "../Formsubmission";
import TokenExpireForm from '../TokenExpireForm';
import React, {useEffect} from 'react';


const FormSubmissionPage = ({isExpire,setIsExpire,getUserToken,checkTokenExpiration}) =>{

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
                <div>
                    <FormSubmission/>
                </div>
            )
            }
        </div>
    )
}

export default FormSubmissionPage;