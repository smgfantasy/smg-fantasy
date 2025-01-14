import playersPoints1 from '../data/round1Points.json';
import playersPoints2 from '../data/round2Points.json';
/**
 *  Calculate the current points that the user has. 
 *
 * @param {string} name
 * @param {Array<Object>} playersArray
 * @param {string} gameweek
 * @returns {number}
 */

const calculateCurrPlayerPoints = (name, playersArray, gameweek = 2) => {
    let currPlayerPoints = 0;
    try {
        let foundPlayer;
        if (gameweek === 1) {
            foundPlayer = playersPoints1.find(player => player.name === name);
        } else if (gameweek === 2) {
            foundPlayer = playersPoints2.find(player => player.name === name);
        }
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
