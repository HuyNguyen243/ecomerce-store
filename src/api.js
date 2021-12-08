// import Auth from './helpers/auth';

export const post = (url, body, isAuth = true) => {
    var requestOptions = {
        method: "POST",
        body: body,
        redirect: "follow"
    };

    return apiRequest(url, requestOptions, isAuth);
}

export const put = (url, body, isAuth = true) => {
    var requestOptions = {
        method: "PUT",
        body: body,
        redirect: "follow",
    };

    return apiRequest(url, requestOptions, isAuth);
}

export const get =  (url, isAuth = true) => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    return apiRequest(url, requestOptions, isAuth);
}

function apiRequest(url, requestOptions, isAuth = true) {
    const controller = new AbortController();
    const signal = controller.signal;

    let headers = {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
    }

    if(isAuth) {
        // headers["Authorization"] = "Bearer "+ Auth.get().token;
    }

    var myHeaders = new Headers(headers);

    requestOptions["headers"] = myHeaders;
    requestOptions["signal"] = signal;

    let maxRequestTimeout = 15000;

    setTimeout(() => controller.abort(), maxRequestTimeout);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then(result => {
        return result
    })
    .catch((err) => {
        console.log(err)
    });
}
