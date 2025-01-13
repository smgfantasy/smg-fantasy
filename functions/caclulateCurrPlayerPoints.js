import playersPoints from '../data/round1Points.json';
/**
 *  Calculate the current points that the user has. 
 *
 * @param {string} name
 * @param {Array<Object>} playersArray
 * @returns {number}
 */

const calculateCurrPlayerPoints = (name, playersArray) => {
    let currPlayerPoints = 0;
    try {
        const foundPlayer = playersPoints.find(player => player.name === name);
        const foundPlayerFromArr = playersArray.find(playerFromArr => playerFromArr.name === name);
        if (foundPlayer) {
            currPlayerPoints = foundPlayer.points || 0;
            if (foundPlayerFromArr?.captain) {
                currPlayerPoints *= 2;
            }
        }
    } catch (error) {
        console.log("An error occurred:", error);
    } finally {
        return currPlayerPoints;
    }
}

export default calculateCurrPlayerPoints;
