const selectors = ["field", "start", "timer", "score", "pause", "dialog", "cancel", "total", "results"]
const [ $field, $start, $timer, $score, $pause, $dialog, $cancel, $total, $results ] = getElements(selectors)
const $form = document.forms["results"]
const $input = $form.elements["user-name"]

const BOX_SIZE = 35
const shotSound = new Audio("assets/shot.wav"); shotSound.volume = .2;
const colors = ["red", "blue", "green"]
let rect = $field.getBoundingClientRect()
let fieldHeight = rect.bottom - rect.top
let fieldWidth = rect.right - rect.left
let scoreTable = JSON.parse(localStorage.getItem("score")) || []
let time
let coords
let gameStatus
let timer
let score

$cancel.addEventListener("click", init)
$field.addEventListener("click", hit)
$pause.addEventListener("click", pauseGame)
$form.addEventListener("submit", saveResults)
$start.addEventListener("click", newGame)

init()

function newGame() {
    init()
    $field.classList.remove("paused")
    timer = gameFlow()
    gameStatus = {started: true, paused: false}
    $pause.classList.remove("disabled")
}

function gameFlow() {
    return setInterval(() => {
        createBlocks(1)
        time -= 1000
        setTime(new Date(time))
    }, 1000)
}

function setTime(time) {
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    $timer.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

    if (time < 1000) {
        gameOver()
    }
}

function hit(event) {
    if (gameStatus.started && !gameStatus.paused) {
        const $target = event.target
        if ($target.dataset.type) {
            flash(event)
            shotSound.currentTime = 0
            shotSound.play()
            this.removeChild($target)
            addScore(10)
            createBlocks(Math.floor((Math.random() * 2) + 1))
        }
    }
}

function addScore(amount) {
    $score.innerHTML = `Score: <span class="score">${score += amount}</span>`
}

function gameOver() {
    clearInterval(timer)
    $field.classList.add("paused")
    $total.innerHTML = `Your score: <span class="score">${score}</span>`
    $dialog.style.display = "flex"
    $form.elements["user-name"].focus()
}

function saveResults(event) {
    event.preventDefault()
    const name = $input.value
    if (name === '') {
        $input.classList.add("error")
        return
    }
    scoreTable.push({name, score})
    localStorage.setItem("score", JSON.stringify(scoreTable))
    $dialog.style.display = "none"
    init()
}

function drawTable() {
    $results.innerHTML = `<h2>HI-SCORE</h2>`
    scoreTable = sortResults(scoreTable)
    scoreTable.forEach(({ name, score }) => {
        const $record = document.createElement('div')
        $record.innerHTML = `<span>${name}</span><span class="score">${score}</span>`
        $results.appendChild($record)
    })
}

function createBlocks(amount) {
    for(let i = 0; i < amount; i++) {
        const $box = document.createElement('div')
        $box.classList.add("box", colors[Math.floor(Math.random() * 3)])
        $box.dataset.type = "box"
        const top = getOffset(fieldHeight) + 'px'
        const left = getOffset(fieldWidth) + 'px'
        if (checkPosition(coords, {top, left})) {
            $box.style.top = top
            $box.style.left = left
            coords.push({top, left})
            coords.push({top, left})
            $field.appendChild($box)
        }
    }
}

function pauseGame() {
    if (gameStatus.paused) {
        gameStatus.paused = false
        $pause.innerText = 'PAUSE'
        timer = gameFlow()
        $field.classList.remove("paused")
    } else {
        gameStatus.paused = true
        $pause.innerText = 'RESUME'
        clearInterval(timer)
        $field.classList.add("paused")
    }
}

function init() {
    time = 60 * 1000
    coords = []
    gameStatus = {started: false, paused: false}
    score = 0
    setTime(new Date(time))
    addScore(0)
    drawTable()
    $dialog.style.display = "none"
    $field.innerHTML = ''
    $pause.classList.add("disabled")
    clearInterval(timer)
    $input.value = ''
    $input.classList.remove("error")
}

function sortResults(results) {
    return results.sort((a, b) => b.score - a.score)
}

function getOffset(size) {
    const rawOffset = Math.abs(Math.floor(Math.random() * size) - BOX_SIZE)
    return rawOffset - (rawOffset % BOX_SIZE)
}

function checkPosition(positions, {top,left}) {
    return !positions.some(position => position.top === top && position.left === left)
}

function getElements(selectors) {
    return selectors.map(selector => document.getElementById(selector))
}

function flash(event) {
    const $flash = document.createElement('div')
    $flash.style.top = event.clientY - 25 + "px"
    $flash.style.left = event.clientX - 25 + "px"
    $flash.classList.add("flash")
    $field.appendChild($flash)

    setTimeout(() => {
        $field.removeChild($flash)
    }, 1000)
}

//adaptive

window.onresize = function() {
    rect = $field.getBoundingClientRect()
    fieldHeight = rect.bottom - rect.top
    fieldWidth = rect.right - rect.left
    updateSidebar()
}
updateSidebar()

function updateSidebar() {
    if (window.innerWidth < 1000) {
        let showSidebar = false
        const $toggle = document.getElementById("toggle")
        const $sidebar = document.getElementById("sidebar")
        $toggle.addEventListener("click", toggle)

        function toggle() {
            if (showSidebar) {
                $sidebar.classList.remove("show")
                showSidebar = false
                $toggle.innerHTML= '&#x2B31;'
            } else {
                $sidebar.classList.add("show")
                showSidebar = true
                $toggle.innerHTML= '&#x2715'
            }
            pauseGame()
        }
    }
}