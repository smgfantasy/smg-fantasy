/**
 * Checks if a player slot is active in the given formation.
 *
 * @param {number} position
 * @param {string} currFormation
 * @returns {boolean}
 */
const checkPlayerSlotActive = (position, currFormation) => {
    let active = false;
    if (currFormation === '2-1-2' && (position === 1 || position === 3 || position === 5 || position === 7 || position === 9)) active = true;
    if (currFormation === '2-2-1' && (position === 1 || position === 3 || position === 4 || position === 6 || position === 8)) active = true;
    if (currFormation === '3-1-1' && (position === 1 || position === 2 || position === 3 || position === 5 || position === 8)) active = true;
    if (position > 9 || position === 0) active = true;
    return active;
}


export default checkPlayerSlotActive;
