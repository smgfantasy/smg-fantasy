import React from 'react'
import PlayerSlot from './PlayerSlot';

const Subs = () => {
    return (
        <>
            <div className='w-full bg-[#6acd98] py-2 rounded-b-md'>
                <div className='flex justify-around w-full'>
                    <div className='font-bold text-xs'>1. DEF</div>
                    <div className='font-bold text-xs'>2. DEF</div>
                    <div className='font-bold text-xs'>3. MID</div>
                </div>
                <div className='flex justify-around'>
                    <PlayerSlot position={-1} />
                    <PlayerSlot position={-1} />
                    <PlayerSlot position={-1} />
                </div>
            </div>
        </>
    );
}

export default Subs