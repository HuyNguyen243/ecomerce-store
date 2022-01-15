// import Auth from './helpers/auth';

export const post = (url, body, isAuth = true) => {
    var requestOptions = {
        method: "POST",
        body: body,
        redirect: "follow",
        headers : new Headers(
            {
                'Accept': 'application/json',
            }
        )
    };

    return apiRequest(url, requestOptions, isAuth);
}

export const put = (url, body, isAuth = true) => {
    var requestOptions = {
        method: "PUT",
        body: body,
        redirect: "follow",
        headers : new Headers(
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        )
    };

    return apiRequest(url, requestOptions, isAuth);
}

export const get =  (url, isAuth = true) => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers : new Headers(
            {
                'Accept': 'application/json'
            }
        )
    };
    return apiRequest(url, requestOptions, isAuth);
}

export const del =  (url, isAuth = true) => {
    var requestOptions = {
        method: "DELETE",
        redirect: "follow",
        headers : new Headers(
            {
                'Accept': 'application/json'
            }
        )
    };
    return apiRequest(url, requestOptions, isAuth);
}

function apiRequest(url, requestOptions, isAuth = true) {
    const controller = new AbortController();
    const signal = controller.signal;

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
