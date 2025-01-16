import React from 'react';
import { useAppContext } from '@/context/AppContext';


const PlayerMatch = ({ gameWeek, points, opponent }) => {
    const { setIsPlayerMatchMenuOpen, setSelectedPlayerMatchMenu } = useAppContext();

    const handlePlayerMatchClick = (gameWeek) => {
        setIsPlayerMatchMenuOpen(true);
        setSelectedPlayerMatchMenu(gameWeek);
    }
    return (
        <div onClick={() => handlePlayerMatchClick(gameWeek)} className='flex flex-col gap-2 items-center bg-[#FFFFFF80] rounded-lg'>
            <div className='text-[#7a7a7a]'>GW{gameWeek}</div>
            <div>{opponent}</div>
            {points === '-' ? <div className='w-full bg-white text-purple px-[26px] font-bold rounded-b-md'>{points}</div> : <div className='w-full bg-white text-purple px-3 font-bold rounded-b-md'>{points} pts</div>}

        </div>
    );
};

export default PlayerMatch