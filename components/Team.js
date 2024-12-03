'use client';

import React from 'react';

const StatItem = ({ label, value, highlight }) => {
    return (
        <div className='flex flex-col justify-center w-1/3 gap-2'>
            <div>{label}</div>
            <div className={`font-bold ${highlight ? 'bg-green-500 rounded-sm' : ''}`}>{value}</div>
        </div>
    );
}

const TransferInfo = ({ freeTransfers, cost, budget }) => {
    return (
        <div className='flex justify-center text-xs font-light text-purple gap-4 mx-12'>
            <StatItem label="Free transfers" value={freeTransfers} />
            <StatItem label="Cost" value={`${cost} pts`} />
            <StatItem label="Budget" value={budget} highlight={true} />
        </div>
    );
}

const Header = () => {
    return (
        <>
            <div className='bg-[#ffffff99] mx-2 my-3 rounded-lg'>
                <div className='w-full pb-4 border-t border-gray-200 flex text-center justify-center flex-col gap-4'>
                    <div>
                        <span className='bg-purple px-4 py-1 rounded-b-xl'>
                            <span style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                                className='text-sm font-bold text-transparent'>
                                Points/Rankings
                            </span>
                        </span>
                    </div>
                    <div className='text-xs text-purple'>
                        Gameweek 15:
                        <span className='font-bold font text-sm'> Sat 7 Dec 13:00</span>
                    </div>
                    <div className='h-px w-full mb-4' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
                    <TransferInfo freeTransfers={5} cost={0} budget={0.1} />
                </div>
            </div>
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

const Team = () => {
    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple'>Pick Team - Pergisha FC</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 60px, rgba(255, 255, 255, 0.5) 150px, white 240px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header></Header>
                <Pitch />
            </div>
            <Subs />
        </div>
    )
}

export default Team;