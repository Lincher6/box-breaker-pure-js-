import { getElements } from "../utils.js";
if (document.cookie.split('=')[0] === 'user') window.location.href = '/game';

const selectors = ["error", "registration-form"];
const [ $error, $registrationForm ] = getElements(selectors);

$registrationForm.addEventListener('submit', register);

async function register(event) {
    event.preventDefault();
    $error.innerText = '';
    const { login, name, password, confirmPassword } = $registrationForm;

    const response = await fetch('/registration', {
        method: 'POST',
        body: JSON.stringify({
            login: login.value,
            name: name.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        const { message } = await response.json();
        $error.innerText = message;
        password.value = '';
        confirmPassword.value = '';
    } else {
        window.location.href = response.url;
    }
}