import { checkPosition, getElements, getOffset } from "../utils.js";
if (document.cookie.split('=')[0] !== 'user') window.location.href = '/login';

const selectors = [
    "field", "start", "timer", "score", "pause", "dialog",
    "cancel", "total", "results", "username", "hi-score"
];

const [
    $field, $start, $timer, $score, $pause, $dialog,
    $cancel, $total, $results, $username, $hiScore
] = getElements(selectors);

const $form = document.forms["results"];

const shotSound = new Audio("../assets/shot.wav"); shotSound.volume = .2;
const colors = ["red", "blue", "green"];
let fieldHeight = $field.offsetHeight;
let fieldWidth = $field.offsetWidth;
let scoreTable = [];
let time, coords, gameStatus, timer, score;
let user = { name: '-', hiScore: 0 };

$cancel.addEventListener("click", init);
$field.addEventListener("click", hit);
$pause.addEventListener("click", pauseGame);
$form.addEventListener("submit", saveResult);
$start.addEventListener("click", newGame);
$timer.addEventListener("blur", editTime);

loadResults();
init();


function newGame() {
    init();
    $field.classList.remove("paused");
    timer = gameFlow();
    gameStatus = { started: true, paused: false };
    $pause.classList.remove("disabled");
}

function gameFlow() {
    return setInterval(() => {
        createBlocks(1);
        time -= 1000;
        setTime(new Date(time));
    }, 1000)
}

function setTime(time) {
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    $timer.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    if (time < 1000) {
        gameOver();
    }
}

function editTime(event) {
    const input = event.target.textContent;
    if (input.match(/^[0-6][0-9]:[0-6][0-9]$/)) {
        const [minutes, seconds] = input.split(':');
        time = (minutes * 60 * 1000) + (seconds * 1000);
    } else {
        time = 60 * 1000;
    }
    setTime(new Date(time));
}

function hit(event) {
    if (gameStatus.started && !gameStatus.paused) {
        const $target = event.target;
        if ($target.dataset.type) {
            flash(event);
            shotSound.currentTime = 0;
            shotSound.play();
            this.removeChild($target);
            addScore(10);
            createBlocks(Math.floor((Math.random() * 2) + 1));
        }
    }
}

function addScore(amount) {
    $score.innerHTML = `Score: <span class="score">${score += amount}</span>`;
}

function gameOver() {
    clearInterval(timer);
    $field.classList.add("paused");
    $total.innerHTML = `Поздравляем <span class="primary">${user.name}</span><br/>
                        Вы набрали: <span class="secondary">${score}</span><br/>
                        Ваш лучший результат: <span class="secondary">${user.hiScore}</span><br/>`;
    $dialog.style.display = "flex";
}

async function saveResult(event) {
    event.preventDefault();
    const { name, hiScore } = user;
    user.hiScore = hiScore > score ? hiScore : score;
    const response = await uploadResult({ name, score });
    const { topResults } = await response.json();
    scoreTable = topResults;
    $dialog.style.display = "none";
    console.log($dialog.style);
    init();
}

async function loadResults() {
    const response = await fetch('/results', {
        method: 'GET'
    })
    const { topResults, userResult } = await response.json();
    scoreTable = topResults;
    user = userResult;
    drawTable();
}

function uploadResult(result) {
    return fetch('/results', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

function drawTable() {
    $results.innerHTML = `<h2>Таблица лидеров</h2>`;
    scoreTable.forEach(({ name, score }) => {
        const $record = document.createElement('div');
        $record.innerHTML = `<span class=${name === user.name ? 'primary': ''}>${name}</span>
                             <span class="score">${score}</span>`;
        $results.appendChild($record);
    })
    $username.innerHTML = `Игрок: <h3 class="primary">${user.name}</h3>`;
    $hiScore.innerHTML = `Hi-score: <h3 class="secondary">${user.hiScore}</h3>`
}

function createBlocks(amount) {
    for(let i = 0; i < amount; i++) {
        const $box = document.createElement('div');
        $box.classList.add("box", colors[Math.floor(Math.random() * 3)]);
        $box.dataset.type = "box";
        const top = getOffset(fieldHeight) + 'px';
        const left = getOffset(fieldWidth) + 'px';
        if (checkPosition(coords, {top, left})) {
            $box.style.top = top;
            $box.style.left = left;
            coords.push({top, left});
            coords.push({top, left});
            $field.appendChild($box);
        }
    }
}

function pauseGame() {
    if (gameStatus.paused) {
        gameStatus.paused = false;
        $pause.innerText = 'Пауза';
        timer = gameFlow();
        $field.classList.remove("paused");
        $timer.contentEditable = false;
    } else {
        gameStatus.paused = true;
        $pause.innerText = 'Дальше';
        clearInterval(timer);
        $field.classList.add("paused");
        $timer.contentEditable = true;
    }
}

function init() {
    time = 60 * 1000;
    coords = [];
    gameStatus = {started: false, paused: false};
    score = 0;
    setTime(new Date(time));
    addScore(0);
    drawTable();
    $dialog.style.display = "none";
    $field.innerHTML = '';
    $pause.classList.add("disabled");
    clearInterval(timer);
}

function flash(event) {
    const $flash = document.createElement('div');
    $flash.style.top = event.clientY - 25 + "px";
    $flash.style.left = event.clientX - 25 + "px";
    $flash.classList.add("flash");
    $field.appendChild($flash);

    setTimeout(() => {
        $field.removeChild($flash);
    }, 1000);
}

//adaptive

window.onresize = function() {
    fieldHeight = $field.offsetHeight;
    fieldWidth = $field.offsetWidth;
    updateSidebar();
}
updateSidebar();

function updateSidebar() {
    if (window.innerWidth < 1000) {
        let showSidebar = false;
        const $toggle = document.getElementById("toggle");
        const $sidebar = document.getElementById("sidebar");
        $toggle.addEventListener("click", toggle);

        function toggle() {
            if (showSidebar) {
                $sidebar.classList.remove("show");
                showSidebar = false;
                $toggle.innerHTML= '&#x2B31;';
            } else {
                $sidebar.classList.add("show");
                showSidebar = true;
                $toggle.innerHTML= '&#x2715';
            }
        }
    }
}
