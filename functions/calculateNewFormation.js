/**
 * Calculates the new formation of players on the pitch after swapping two positions.
 *
 * @param {number} position
 * @param {number} selectedSlot
 * @param {Array<Object>} playersArray
 * @returns {string}
 */
const calculateNewFormation = (position, selectedSlot, playersArray) => {
    const index1 = position, index2 = selectedSlot;

    if (index1 === 0 || index2 === 0) return '';
    const array = [...playersArray];
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    let defs = 0, mids = 0, fwds = 0;
    for (let i = 0; i <= 9; i++) {
        if (array[i].position === 'def') defs++;
        if (array[i].position === 'mid') mids++;
        if (array[i].position === 'fwd') fwds++;
    }

    return `${defs}-${mids}-${fwds}`;
};

export default calculateNewFormation;
