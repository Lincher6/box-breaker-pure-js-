
export function parseCookies(cookies) {
    return cookies.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = JSON.parse(decodeURIComponent(value));
        return acc;
    }, {});
}
export function checkPosition(positions, {top,left}) {
    return !positions.some(position => position.top === top && position.left === left);
}

export function getElements(selectors) {
    return selectors.map(selector => document.getElementById(selector));
}

export function getOffset(size) {
    const BOX_SIZE = 35;
    const rawOffset = Math.abs(Math.floor(Math.random() * size) - BOX_SIZE);
    return rawOffset - (rawOffset % BOX_SIZE);
}

export function sortResults(results = [])  {
    return results.sort((a, b) => b.score - a.score);
}

export function addError(element, text) {
    const $input = element.children[0];
    const $error = element.children[1];
    $input.classList.add('error');
    $error.classList.add('visible');
    $error.innerText = text;
}

export function clearErrors() {
    for (const element of arguments) {
        element.children[0].classList.remove('error');
        element.children[1].classList.remove('visible');
    }
}