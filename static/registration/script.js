import {getElements, addError, clearErrors, parseCookies} from "../utils.js";

const selectors = ["username", "password", "confirm-password", "registration-form"];
const [ $username, $password, $confirmPassword, $registrationForm ] = getElements(selectors);

$registrationForm.addEventListener('submit', register);

if (parseCookies(document.cookie).user.username) {
    window.location.href = '/game'
}

async function register(event) {
    event.preventDefault();
    const username = $username.children[0].value;
    const password = $password.children[0].value;
    const confirmPassword = $confirmPassword.children[0].value;
    clearErrors($username, $password, $confirmPassword);

    if (username === '') {
        return addError($username, 'required');
    } else if (password === '') {
        return addError($password, 'required');
    } else if (confirmPassword === '') {
        return addError($confirmPassword, 'required');
    }

    if (password !== confirmPassword) {
        return addError($confirmPassword, 'passwords don\'t match');
    }

    const response = await fetch('/registration', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (response.status === 400) {
        const { message } = await response.json();
        if (message === 'already exists') {
            return addError($username, message)
        }
    } else if (response.status === 200) {
        window.location.href = response.url;
    }
}