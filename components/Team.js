'use client';

import React, { useEffect } from 'react';
import PlayerSlot from './PlayerSlot';
import Subs from './Subs';
import { useAppContext } from '@/context/AppContext';
import getUserTeam from '@/utils/team/getUserTeam';
import PlayerPickerMenu from './PlayerPickerMenu';

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
            <div className='bg-[#ffffff99] mx-2 translate-y-3 rounded-lg'>
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

const Pitch = ({ sessionCookie }) => {
    const { players, setPlayers } = useAppContext();

    useEffect(() => {
        if (players.length > 0) return;
        // Fetch team data only if players are not yet set
        const fetchTeamData = async () => {
            try {
                const data = await getUserTeam(sessionCookie);
                if (data) {
                    setPlayers(data.team);
                } else {
                    console.error("Failed to fetch team data");
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        if (players.length === 0) {
            fetchTeamData();
        }
    }, [players.length, sessionCookie, setPlayers]);

    return (
        (players.length > 0
            && (<div className="mt-10 w-full min-h-[600px] flex flex-col items-center gap-5" style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
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
        )


    );
}

const Team = ({ sessionCookie }) => {
    return (
        <>
            <div className='pt-8 px-1'>
                <h1 className='font-bold text-xl text-purple'>Pick Team - Pergisha FC</h1>
                <div style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 60px, rgba(255, 255, 255, 0.5) 150px, white 240px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))', backgroundSize: 'auto, 90px 60px, auto', backgroundRepeat: 'no-repeat', backgroundPosition: '0px center, right top, 0px center' }} className='mt-10 w-full bg-[#2C3E50] h-[650px] rounded-md'>
                    <Header></Header>
                    <Pitch sessionCookie={sessionCookie} />
                </div>
                <Subs />
            </div>
            <PlayerPickerMenu />
        </>
    )
}

export default Team;