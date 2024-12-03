'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, Pi } from 'lucide-react';

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
const PlayerSlot = ({ active, img, name = 'Default', points = 'Nan' }) => {

    const handlePlayerClick = () => {
        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu.style.maxHeight === '' || playerMenu.style.maxHeight === '0px') {
            playerMenu.style.maxHeight = 600 + 'px';
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
        <div className='mt-10 w-full min-h-[600px] flex flex-col items-center gap-5' style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
            <PlayerSlot active={true} />
            <div className='flex justify-around w-full'>
                <PlayerSlot active={true} name='Raya' points={6} img={'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp'} />
                <PlayerSlot />
                <PlayerSlot active={true} />
            </div>
            <div className='flex justify-around w-full'>
                <PlayerSlot />
                <PlayerSlot active={true} />
                <PlayerSlot />
            </div>
            <div className='flex justify-around w-full'>
                <PlayerSlot active={true} />
                <PlayerSlot />
                <PlayerSlot active={true} />
            </div>
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
                    <PlayerSlot active={true} />
                    <PlayerSlot active={true} />
                    <PlayerSlot active={true} />
                </div>
            </div>
        </>
    );
}
const Points = () => {
    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple'>Points - Pergisha FC</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 30px, rgba(255, 255, 255, 0.5) 75px, white 120px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center;' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header></Header>
                <div className='flex justify-center mt-3'>
                    <div className='flex flex-col items-center justify-around bg-purple px-10 py-4 rounded-lg'>
                        <div className='text-white text-xs'>Final Points</div>
                        <div className='text-transparent text-5xl font-bold' style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}>
                            45
                        </div>
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