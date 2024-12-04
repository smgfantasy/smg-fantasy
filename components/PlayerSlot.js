import React from 'react'
import { useVariant } from '@/context/VariantContext';

const formation = '3-1-1';

const PlayerSlot = ({ img, name = 'Default', points = 'Nan', position }) => {
    const { variant } = useVariant();

    let active = false;
    if (formation === '2-1-2' && (position === 1 || position === 3 || position === 5 || position === 7 || position === 9)) active = true;
    if (formation === '2-2-1' && (position === 1 || position === 3 | position === 4 || position === 5 || position === 8)) active = true;
    if (formation === '3-1-1' && (position === 1 || position === 2 || position === 3 || position === 5 || position === 8)) active = true;
    if (position === -1 || position === 0) active = true;
    const handlePlayerClick = () => {
        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu.style.maxHeight === '' || playerMenu.style.maxHeight === '0px') {
            if (variant === "points") playerMenu.style.maxHeight = 550 + 'px';
            else playerMenu.style.maxHeight = 600 + 'px';
        } else {
            playerMenu.style.maxHeight = '0px';
        }
    }
    return (
        <div onClick={handlePlayerClick} className={`${active ? '' : 'hidden'} w-[60px] flex flex-col relative`}>
            <div className='w-[60px] h-[58px] bg-[#0e9d5e] rounded-t-md'>
                <img src={img} />
            </div>
            <div className='w-full bg-white text-center text-xs'>{name}</div>
            <div className='w-full bg-purple text-white text-center text-xs rounded-b-md'>{points}</div>
        </div >
    );
}

export default PlayerSlot