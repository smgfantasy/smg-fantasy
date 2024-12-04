'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
const formation = '3-1-1';
const Header = () => {
    return (
        <>
            <div className='flex justify-between px-2 pt-3 pb-1 items-center'>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowLeftCircleIcon size={20} />
                </div>
                <div className='font-bold'>Gameweek 12</div>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowRightCircleIcon size={20} />
                </div>
            </div>
            <div className='h-px w-full' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
        </>
    );
}
const PlayerSlot = ({ img, name = 'Default', points = 'Nan', position }) => {
    let active = false;
    if (formation === '2-1-2' && (position === 1 || position === 3 || position === 5 || position === 7 || position === 9)) active = true;
    if (formation === '2-2-1' && (position === 1 || position === 3 | position === 4 || position === 5 || position === 8)) active = true;
    if (formation === '3-1-1' && (position === 1 || position === 2 || position === 3 || position === 5 || position === 8)) active = true;
    if (position === -1 || position === 0) active = true;
    const handlePlayerClick = () => {
        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu.style.maxHeight === '' || playerMenu.style.maxHeight === '0px') {
            playerMenu.style.maxHeight = 550 + 'px';
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
const Pitch = () => {
    return (
        <div className="mt-10 w-full min-h-[600px] flex flex-col items-center gap-5" style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
            <PlayerSlot position={0} active={true} name="Raya" points={6} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
            {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-around w-full">
                    {[...Array(3)].map((_, colIndex) => {
                        const position = rowIndex * 3 + colIndex + 1;
                        return <PlayerSlot key={position} position={position} name="Raya" points={6} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />;
                    })}
                </div>
            ))}
        </div>

    );
}
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
const Points = () => {
    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple'>Points - Pergisha FC</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 30px, rgba(255, 255, 255, 0.5) 75px, white 120px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header></Header>
                <div className='flex justify-center mt-3 gap-2'>
                    <div className='flex flex-col justify-center items-center rounded-lg'>
                        <div className='font-thin'>Average Points</div>
                        <div className='font-bold text-2xl'>60</div>
                    </div>
                    <div className='flex flex-col items-center justify-around bg-purple px-9 py-4 rounded-lg'>
                        <div className='text-white text-xs'>Final Points</div>
                        <div className='text-transparent text-5xl font-bold' style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}>
                            45
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg'>
                        <div className='font-thin'>Highest Points</div>
                        <div className='font-bold text-2xl'>143</div>
                    </div>
                    {/* <div className='-mr-10'>Dropdown</div> */}
                </div>
                <Pitch />
            </div>
            <Subs />
        </div >
    )
}

export default Points;