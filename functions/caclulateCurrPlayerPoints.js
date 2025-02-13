import playersPoints1 from '../data/gameweek1/roundPoints.json';
import playersPoints2 from '../data/gameweek2/roundPoints.json';
import playersPoints3 from '../data/gameweek3/roundPoints.json';
// Add more imports as needed for other gameweeks

// Mapping gameweek numbers to their respective data
const playersPointsMap = {
    1: playersPoints1,
    2: playersPoints2,
    3: playersPoints3
    // Add more mappings as needed
};

/**
 * Calculate the current points that the user has.
 *
 * @param {string} name - The player's name.
 * @param {Array<Object>} playersArray - Array of player objects.
 * @param {number} gameweek - The gameweek number.
 * @returns {number} - The calculated points.
 */
const calculateCurrPlayerPoints = (name, playersArray, gameweek = 2) => {
    let currPlayerPoints = 0;
    try {
        // Select the appropriate data based on the gameweek
        const playersPointsData = playersPointsMap[gameweek];
        if (!playersPointsData) {
            console.warn(`No data available for gameweek ${gameweek}`);
            return 0;
        }

        // Find the player in the imported data
        const foundPlayer = playersPointsData.find(player => player.name === name);
        const foundPlayerFromArr = playersArray.find(playerFromArr => playerFromArr.name === name);

        if (foundPlayer) {
            currPlayerPoints = foundPlayer.points || 0;

            // Double points if the player is a captain
            if (foundPlayerFromArr?.captain) {
                currPlayerPoints *= 2;
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        return currPlayerPoints;
    }
};

export default calculateCurrPlayerPoints;
