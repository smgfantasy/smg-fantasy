import React from 'react';
import PlayerSlotImage from './PlayerSlotImage';


const PlayerSlotContent = ({ playersArray, position, playerTeam, currPlayerPoints, name }) => {
    if (name === 'Никола Кунчев') name = 'Александър Маринов';
    return (
        <>
            {playersArray[position] && playersArray[position].captain && <div className='absolute right-0 rounded-full w-5 h-5 bg-blue-600 text-white flex justify-center items-center'>C</div>}

            <div className='w-[60px] h-[58px] bg-[#0e9d5e] rounded-t-md'>
                {playerTeam !== '' && (<PlayerSlotImage playerTeam={playerTeam} />)}
            </div>
            <div className='w-full bg-white text-center text-xs overflow-hidden'>{name.split(" ")[1]}</div>
            <div className='w-full bg-purple text-white text-center text-xs rounded-b-md'>{currPlayerPoints}</div>
        </>
    )
}

export default PlayerSlotContent;