import { getElements } from '../utils.js';

const selectors = ['search-form', 'users-table', 'previous', 'next', 'first', 'last'];
const [ $searchForm, $usersTable, $previous, $next, $first, $last ] = getElements(selectors);

const currentUser = JSON.parse($searchForm.dataset.user);
let users = [];
let totalUserCount = 0;
const pageSize = 5;
let page = 1;
let searchString = '';
let sortType = 'hiScore';
const sortTable = {
    login: { descending: false },
    name: { descending: false },
    hiScore: { descending: false },
    gamesPlayed: { descending: false },
    registrationDate: { descending: false }
}
function getTableHeader()  {
    return `
        <tr class='header'>
            <td>Id</td>
            <td class='sortable' data-type='login'>Логин ${sortTable.login.descending ? '&#8681' : '&#8679'}</td>
            <td class='sortable' data-type='name'>Имя ${sortTable.name.descending ? '&#8681' : '&#8679'}</td>
            <td class='sortable' data-type='hiScore'>Hi-score ${sortTable.hiScore.descending ? '&#8681' : '&#8679'}</td>
            <td class='sortable' data-type='gamesPlayed'>Кол-во игр ${sortTable.gamesPlayed.descending ? '&#8681' : '&#8679'}</td>
            <td class='sortable' data-type='registrationDate'>Дата регистрации ${sortTable.registrationDate.descending ? '&#8681' : '&#8679'}</td>
            <td>Права</td>
            <td>IP</td>
        </tr>
    `
}

$first.addEventListener('click', nextPage);
$last.addEventListener('click', nextPage);
$previous.addEventListener('click', nextPage);
$next.addEventListener('click', nextPage);
$searchForm.addEventListener('submit', search);
$usersTable.addEventListener('change', changeRole);
$usersTable.addEventListener('click', sort);

displayUsers();

function search(event) {
    event.preventDefault();
    searchString = $searchForm.search.value;
    initTable();
    displayUsers();
}

function getUsers() {
    return fetch('/users?' + new URLSearchParams({
        pageSize,
        page,
        searchString,
        sortType,
        sortValue: sortTable[sortType].descending ? 1 : -1
    }), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            users = data.users;
            totalUserCount = data.totalUserCount;
        })
}

function nextPage(event) {
    const { arrow } = event.target.dataset;
    switch (arrow) {
        case 'next': page++; break;
        case 'previous': page--; break;
        case 'first': page = 1; break;
        case 'last': page = Math.ceil(totalUserCount / pageSize); break;
    }
    displayUsers();
}

function sort(event) {
    const { type } = event.target.dataset;
    if (type) {
        sortType = type;
        sortTable[type].descending = !sortTable[type].descending;
        displayUsers();
    }
}

function changeRole(event) {
    const { login } = event.target.dataset;
    const { value } = event.target;
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
            login,
            key: 'role',
            value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

async function displayUsers() {
    await getUsers();
    $usersTable.innerHTML = getTableHeader();
    users.forEach(user => {
        const date = new Date(user.registrationDate);
        $usersTable.innerHTML += `
        <tr>
            <td>${user._id}</td>
            <td>${user.login}</td>
            <td>${user.name}</td>
            <td>${user.hiScore || 0}</td>
            <td>${user.gamesPlayed || 0}</td>
            <td>${date.toLocaleString()}</td>
            <td>
                <select 
                    ${currentUser.login === user.login && 'disabled'}
                    data-login='${user.login}'
                >
                    <option>player</option>
                    <option ${user.role === 'admin' && 'selected'}>admin</option>
                </select>
            </td>
            <td>${user.userIp}</td>
        </tr>
    `
    })
    checkButtons();
}

function initTable() {
    page = 1;
    totalUserCount = 0;
    users = [];
}

function checkButtons() {
    if (page > 1) {
        $first.classList.remove('disabled');
        $previous.classList.remove('disabled');
    } else {
        $first.classList.add('disabled');
        $previous.classList.add('disabled');
    }

    if (page * pageSize >= totalUserCount) {
        $last.classList.add('disabled');
        $next.classList.add('disabled');
    } else {
        $last.classList.remove('disabled');
        $next.classList.remove('disabled');
    }
}