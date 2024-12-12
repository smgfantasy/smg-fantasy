'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <>
            <div className='flex justify-between px-2 pt-3 pb-1 items-center'>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ChevronLeft size={20} />
                </div>
                <div className='font-bold text-purple'>Gameweek 12</div>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ChevronRight size={20} />
                </div>
            </div>
            <div className='h-px w-full' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
            <div className='my-3 text-center text-purple text-sm'>All times are shown in your <b>local time</b></div>
        </>
    );
}
const MatchResult = ({ resultA, resultB }) => {
    return (
        <div className='flex bg-purple rounded-md py-1'>
            <span className='text-white px-2 border-r border-white text-sm'>{resultA}</span>
            <span className='text-white px-2 text-sm'>{resultB}</span>
        </div>
    );
}
const MatchTime = ({ time }) => {
    return (
        <div className='flex border border-[#efebf0] rounded-md px-2 py-1'>
            <span className='text-sm'>{time}</span>
        </div>
    );

}
const MatchRow = ({ teamA, teamB, resultA, resultB, completed, time }) => {

    const [opened, setOpened] = useState(false);

    const hadnleMatchRowClick = () => {
        console.log('opened...');
        setOpened((prev) => !prev);
    }


    return (
        <div onClick={hadnleMatchRowClick} style={{ borderBottom: '1px solid rgba(55, 0, 60, 0.08)' }} className='flex-col border-b border-gray-500'>
            <div className='flex w-full py-3  px-2'>
                {completed &&
                    (<span>
                        <ChevronDown />
                    </span>)
                }
                <div className='flex justify-center w-full items-center gap-5'>
                    <div className='text-lg font-bold'>{teamA}</div>
                    {completed ? (<MatchResult resultA={resultA} resultB={resultB} />) : <MatchTime time={time} />}

                    <div className='text-lg font-bold'>{teamB}</div>
                </div>
            </div>
            <div className={`${opened ? 'max-h-[200px]' : 'max-h-0'} overflow-hidden flex justify-center`}>
                <div className='flex gap-1'>
                    <div>Match Details</div>
                    <div>Player Stats</div>
                </div>
            </div>
        </div >
    );

}
const page = () => {
    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple text-center'>Fixtures & Results</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 40px, rgba(255, 255, 255, 0.5) 100px, white 240px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header />
                <div className='flex justify-center'>
                    <span className='bg-purple px-4 py-1 rounded-b-xl'>
                        <span style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                            className='text-sm font-bold text-transparent'>
                            Saturday 7 December 2024
                        </span>
                    </span>
                </div>
                <div className='flex flex-col mt-3'>
                    <MatchRow completed={true} teamA={'11 A'} resultA={1} resultB={2} teamB={'10 B'} />
                    <MatchRow completed={true} teamA={'11 V'} resultA={1} resultB={2} teamB={'11 E'} />
                    <MatchRow completed={true} teamA={'11 G'} resultA={1} resultB={2} teamB={'10 G'} />
                </div>
                <div className='mt-2 flex justify-center'>
                    <span className='bg-purple px-4 py-1 rounded-b-xl'>
                        <span style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                            className='text-sm font-bold text-transparent'>
                            Saturday 8 December 2024
                        </span>
                    </span>
                </div>
                <div className='flex flex-col mt-3'>
                    <MatchRow time={'15:00'} completed={false} teamA={'11 A'} teamB={'10 B'} />
                    <MatchRow time={'15:00'} completed={false} teamA={'11 V'} teamB={'11 E'} />
                    <MatchRow time={'15:00'} completed={false} teamA={'11 G'} teamB={'10 G'} />
                </div>
            </div>

        </div>
    )
}

export default page;