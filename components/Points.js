'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
import PlayerSlot from './PlayerSlot';
import Subs from './Subs';
import { useAppContext } from '@/context/AppContext';
import getUserTeam from '@/utils/team/getUserTeam';
import playersPoints from '../data/round1Points.json';
import PlayerMatchInfoMenu from './PlayerMatchInfoMenu';
const Header = () => {
    return (
        <>
            <div className='flex justify-between px-2 pt-3 pb-1 items-center'>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowLeftCircleIcon size={20} />
                </div>
                <div className='font-bold'>Gameweek 1</div>
                <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowRightCircleIcon size={20} />
                </div>
            </div>
            <div className='h-px w-full' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
        </>
    );
}
const Pitch = () => {
    const { players, setPlayers } = useAppContext();

    return (
        (players.length > 0 &&
            <div className="mt-10 w-full min-h-[600px] flex flex-col items-center gap-5" style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
                <PlayerSlot position={0} name={players[0].name} points={players[0].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                {[...Array(3)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-around w-full">
                        {[...Array(3)].map((_, colIndex) => {
                            const position = rowIndex * 3 + colIndex + 1;
                            return <PlayerSlot key={position} position={position} name={players[position].name} points={players[position].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />;
                        })}
                    </div>
                ))}
            </div>
        )

    );
}
const Points = ({ sessionCookie, userData }) => {
    const { players, setPlayers, setFormation, points, setPoints } = useAppContext();

    const calculateNewFormation = (array) => {

        let defs = 0, mids = 0, fwds = 0;
        for (let i = 0; i <= 9; i++) {
            if (array[i].position === 'def') defs++;
            if (array[i].position === 'mid') mids++;
            if (array[i].position === 'fwd') fwds++;
        }
        return `${defs}-${mids}-${fwds}`;
    };

    useEffect(() => {
        if (points === 0) {
            let curPts = 0;
            for (let i in players) {
                if (i === '10') {
                    break;
                }
                let currPlayerPoints = 0;
                try {
                    currPlayerPoints = playersPoints.find(player => (player.name === players[i].name)).points;
                } catch {
                    //no player in the round points json file
                }
                if (players[i].captain) {
                    currPlayerPoints = currPlayerPoints * 2;
                }
                curPts += currPlayerPoints;
            }
            setPoints(curPts);
        }

    }, [players.length])

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                // Check if data exists in localStorage
                const storedPlayers = localStorage.getItem("user-team-v2");
                if (storedPlayers) {
                    // Parse and set players from localStorage
                    setPlayers(JSON.parse(storedPlayers));
                    let savedFormation = calculateNewFormation(JSON.parse(storedPlayers));
                    if (savedFormation === '0-0-0') savedFormation = '2-1-2';
                    setFormation(savedFormation);
                    console.log('Formation calculated: ', savedFormation);
                    console.log(storedPlayers);
                    console.log('Team fetched from localStorage...');
                    return; // Exit if data is found in localStorage
                }

                // Fetch data from the server if not in localStorage
                const data = await getUserTeam(sessionCookie);
                if (data) {
                    setPlayers(data.team);
                    let savedFormation = calculateNewFormation(data.team);
                    if (savedFormation === '0-0-0') savedFormation = '2-1-2';
                    setFormation(savedFormation);
                    // Save the fetched data to localStorage
                    localStorage.setItem("user-team-v2", JSON.stringify(data.team));
                } else {
                    console.error("Failed to fetch team data");
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        // Call the function if players array is empty
        if (players.length === 0) {
            fetchTeamData();
        }
    }, [players.length, sessionCookie, setPlayers]);

    return (
        <div className='pt-8 px-1'>
            <h1 className='font-bold text-xl text-purple'>Points - {userData.clubName}</h1>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 30px, rgba(255, 255, 255, 0.5) 75px, white 120px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                <Header></Header>
                <div className='flex justify-center mt-3 gap-2'>
                    <div className='flex flex-col justify-center items-center rounded-lg'>
                        <div className='font-thin'>Average Points</div>
                        <div className='font-bold text-2xl'>{53}</div>
                    </div>
                    <div className='flex flex-col items-center justify-around bg-purple px-9 py-4 rounded-lg'>
                        <div className='text-white text-xs'>Final Points</div>
                        <div className='text-transparent text-5xl font-bold' style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}>
                            {points}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg'>
                        <div className='font-thin'>Highest Points</div>
                        <div className='font-bold text-2xl'>{82}</div>
                    </div>
                    {/* <div className='-mr-10'>Dropdown</div> */}
                </div>
                <Pitch />
            </div>
            <Subs />
            <PlayerMatchInfoMenu />
        </div >
    )
}

export default Points;