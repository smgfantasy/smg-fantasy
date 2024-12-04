import React from 'react'

const PlayerMatch = ({ gameWeek, points, opponent }) => {
    return (
        <div className='flex flex-col gap-2 items-center bg-[#FFFFFF80] rounded-lg'>
            <div className='text-[#7a7a7a]'>GW{gameWeek}</div>
            <div>{opponent}</div>
            <div className='w-full bg-white text-purple px-3 font-bold rounded-b-md'>{points}pts</div>
        </div>
    );
};

export default PlayerMatch