import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticateUser } from './redux/actions/index';
import Auth from './_services/auth';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const isLoading = useSelector(state => state.isLoading);

    const [loaded, setLoaded] = React.useState(false);

    const authenticateCallback = React.useCallback(() => {
        let fullUrl = window.location.href;
        let url = new URL(fullUrl);
        let botId = url.searchParams.get("botId");
        let userId = url.searchParams.get("userId");

        let formData = new FormData();
        formData.append('botId', botId)
        formData.append('userId', userId)
        Auth.init(botId, userId)
        dispatch(authenticateUser(formData))
    }, [dispatch]);

    const loginSuccessCallback = React.useCallback(() => {
        let url = new URL(window.location.href);
        let page = url.searchParams.get("page");
        let id = url.searchParams.get("id");
        let data = url.searchParams.get("data");
        let redirectUrl  = '/';

        if(page !== null) {
            redirectUrl += page
        }
        if(id !== null) {
            redirectUrl += `/${id}`
        }
        if(data !== null) {
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
                let obj = Object.keys(data[i])
                redirectUrl += '?'+obj[0]+"="+data[i][obj[0]]
            }
        }
        history.push(redirectUrl)
    }, [history]);

    React.useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            if (!isAuthenticated) {
                authenticateCallback()
            }
        }
        if (isAuthenticated) {
            loginSuccessCallback()
        }
    }, [authenticateCallback, isAuthenticated, history, loaded, setLoaded, loginSuccessCallback])

    return (
        <>
            {
                isLoading 
                ?
                    <div className="text-center">
                        <div className="loader"></div>
                    </div>
                :
                    !isAuthenticated && 'No data'
            }
        </>
    );
}

export default Login;
