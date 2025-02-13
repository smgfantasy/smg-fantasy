'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';
import PlayerSlot from '@/components/PlayerSlot';
import playersPoints from '../../../../data/gameweek2/roundPoints.json';
import getSpectatedUser from '@/utils/user/getSpectatedUser';

const Subs = ({ players, formation }) => {

    return (
        <>
            {(players.length > 0 &&
                (
                    <div className='w-full bg-[#6acd98] py-2 rounded-b-md'>
                        <div className='flex justify-around w-full'>
                            <div className='font-bold text-xs uppercase'>{players[10] ? `1. ${players[10].position}` : '1. DEF'}</div>
                            <div className='font-bold text-xs uppercase'>{players[11] ? `2. ${players[11].position}` : '2. MID'}</div>
                            <div className='font-bold text-xs uppercase'>{players[12] ? `3. ${players[12].position}` : '3. MID'}</div>
                        </div>
                        <div className='flex justify-around my-2'>
                            <PlayerSlot spectated={true} spectatedFormation={formation} spectatedPlayers={players} position={10} name={players[10].name} points={players[10].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                            <PlayerSlot spectated={true} spectatedFormation={formation} spectatedPlayers={players} position={11} name={players[11].name} points={players[11].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                            <PlayerSlot spectated={true} spectatedFormation={formation} spectatedPlayers={players} position={12} name={players[12].name} points={players[12].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                        </div>
                    </div>
                )
            )}
        </>
    );
}
const Header = () => {
    return (
        <>
            <div className='flex justify-center px-2 pt-3 pb-1 items-center'>
                {/* <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowLeftCircleIcon size={20} />
                </div> */}
                <div className='font-bold'>Gameweek 3</div>
                {/* <div className='py-1 px-3 bg-[#ffffff99] rounded-xl'>
                    <ArrowRightCircleIcon size={20} />
                </div> */}
            </div>
            <div className='h-px w-full' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
        </>
    );
}
const Pitch = ({ players, formation }) => {

    return (
        (players.length > 0 &&
            <div className="mt-10 w-full min-h-[600px] flex flex-col items-center gap-5" style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
                <PlayerSlot spectated={true} spectatedFormation={formation} spectatedPlayers={players} position={0} name={players[0].name} points={players[0].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                {[...Array(3)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-around w-full">
                        {[...Array(3)].map((_, colIndex) => {
                            const position = rowIndex * 3 + colIndex + 1;
                            return <PlayerSlot spectated={true} spectatedFormation={formation} spectatedPlayers={players} key={position} position={position} name={players[position].name} points={players[position].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />;
                        })}
                    </div>
                ))}
            </div>
        )

    );
}
const SpectateView = ({ userData, players, spectatedUserUid }) => {
    const [specatatedTeam, setSpectatedTeam] = useState(null);
    // const points = 69;
    const [formation, setFormation] = useState(null);
    const [points, setPoints] = useState(0);
    const calculateNewFormation = (array) => {

        let defs = 0, mids = 0, fwds = 0, currPoints = 0;
        for (let i = 0; i <= 9; i++) {
            if (array[i].position === 'def') defs++;
            if (array[i].position === 'mid') mids++;
            if (array[i].position === 'fwd') fwds++;
            let playerPoints;
            try {
                const pl = playersPoints.find((p) => p.name === array[i].name);
                const pr = players.find((p) => p.name === array[i].name);
                playerPoints = pl.points;
                if (pr?.captain) {
                    playerPoints *= 2;
                }
                console.log(pl.name + ": " + playerPoints);
                currPoints += playerPoints;
            } catch (e) {
            }
        }
        setPoints(currPoints);
        return `${defs}-${mids}-${fwds}`;
    };

    useEffect(() => {
        let currFormation = calculateNewFormation(players);
        setFormation(currFormation);
        // console.log(currFormation);
        console.log(spectatedUserUid);
        const fetchSpecatatedUser = async () => {
            const spectatedUser = await getSpectatedUser(spectatedUserUid);
            setSpectatedTeam(spectatedUser);
        }
        fetchSpecatatedUser();

    }, [players])

    return (
        <div className='pt-8 px-1'>
            {specatatedTeam && (
                <h1 className='text-center font-bold text-xl text-purple'>
                    {specatatedTeam.name} - {specatatedTeam.clubName}
                </h1>
            )}
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
                <Pitch players={players} formation={formation} />
            </div>
            <Subs players={players} formation={formation} />
            {/* <PlayerInfoMenu /> */}
            {/* <PlayerMatchInfoMenu /> */}
        </div >
    )
}

export default SpectateView;