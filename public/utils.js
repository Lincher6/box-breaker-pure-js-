
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