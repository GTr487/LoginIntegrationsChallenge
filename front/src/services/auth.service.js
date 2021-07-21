const baseUrl = '/auth';

export function signin(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
    .then( res => res.json() )
    .catch(err => console.error(err));
}

export function login() {
    return fetch(`${baseUrl}/login`, {
        method: 'GET',
        credentials: 'include',
    })
    .then( res => res.json() )
    .catch(err => console.error(err));
} 

export function refresh() {
    return fetch(`${baseUrl}/refresh`, {
        method: 'POST',
        credentials: 'include',
    })
    .then( res => res.json() )
    .catch(err => console.error(err));
}