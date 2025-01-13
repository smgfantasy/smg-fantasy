/**
 * Converts the position number of a player to a position string.
 *
 * @param {number} position
 * @param {Array<string>} benchPos
 * @returns {string}
 */
const getPlayerPosition = (position, benchPos) => {
    if (position === 0) return "gk";
    if (position >= 1 && position <= 3) return 'def';
    if (position >= 4 && position <= 6) return 'mid';
    if (position >= 7 && position <= 9) return 'fwd';
    if (position === 10) return benchPos[0] === '' ? 'def' : benchPos[0];
    if (position === 11) return benchPos[1] === '' ? 'mid' : benchPos[1];
    if (position === 12) return benchPos[2] === '' ? 'mid' : benchPos[2];
    return 'pos';
};

export default getPlayerPosition;
