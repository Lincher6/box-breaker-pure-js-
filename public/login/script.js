import { getElements } from "../utils.js";
if (document.cookie.split('=')[0] === 'user') window.location.href = '/game';

const selectors = ["error", "login-form"];
const [ $error, $loginForm ] = getElements(selectors);

$loginForm.addEventListener('submit', login);

async function login(event) {
    event.preventDefault();
    $error.innerText = '';
    const { login, password } = $loginForm;

    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ login: login.value, password: password.value }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        const { message } = await response.json();
        $error.innerText = message;
        password.value = '';
    } else {
        window.location.href = response.url;
    }
}