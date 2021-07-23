const baseUrl = '/auth';

export var authenticationToken;

export function signin(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
    .then(res => res.json().then(obj => {
            authenticationToken = obj.token;
        })
    );
}

export function refresh() {
    return fetch(`${baseUrl}/refresh`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(res => res.json() );
}

export function signout() {
    return fetch(`${baseUrl}/signout`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(res => res.json().then(obj => {
            authenticationToken = undefined;
        })
    );
}

export function login() {
    return fetch(`${baseUrl}/login`, {
        method: 'GET',
        credentials: 'include',
    })
    .then(res => res.json() );
} 
