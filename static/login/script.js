import {getElements, addError, clearErrors, parseCookies} from "../utils.js";

const selectors = ["username", "password", "login-form"];
const [ $username, $password, $loginForm ] = getElements(selectors);

$loginForm.addEventListener('submit', login);

if (parseCookies(document.cookie).user.username) {
    window.location.href = '/game'
}

async function login(event) {
    event.preventDefault();
    const username = $username.children[0].value;
    const password = $password.children[0].value;
    clearErrors($username, $password);

    if (username === '') {
        return addError($username, 'required');
    } else if (password === '') {
        return addError($password, 'required');
    }

    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (response.status === 400) {
        const { message } = await response.json();
        if (message === 'no user found') {
            return addError($username, message)
        } else if (message === 'wrong password') {
            return addError($password, message)
        }
    } else if (response.status === 200) {
        window.location.href = response.url;
    }
}