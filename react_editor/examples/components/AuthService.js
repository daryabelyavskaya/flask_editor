import { BehaviorSubject } from 'rxjs';


const APP_API = process.env.APP_API || "http://127.0.0.1:5000/api/v1/" ;

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${APP_API}users/auth/`, requestOptions)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log( JSON.parse(localStorage.getItem('currentUser')))
            currentUserSubject.next(user);
            return user;
        });
}

