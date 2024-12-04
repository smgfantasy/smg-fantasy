import React from 'react'
import PlayerSlot from './PlayerSlot';
import { useAppContext } from '@/context/AppContext';

const Subs = () => {
    const { players } = useAppContext();

    return (
        <>
            <div className='w-full bg-[#6acd98] py-2 rounded-b-md'>
                <div className='flex justify-around w-full'>
                    <div className='font-bold text-xs'>1. DEF</div>
                    <div className='font-bold text-xs'>2. DEF</div>
                    <div className='font-bold text-xs'>3. MID</div>
                </div>
                <div className='flex justify-around my-2'>
                    <PlayerSlot position={10} name={players[10].name} points={players[10].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                    <PlayerSlot position={11} name={players[11].name} points={players[11].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                    <PlayerSlot position={12} name={players[12].name} points={players[12].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                </div>
            </div>
        </>
    );
}

export default Subs