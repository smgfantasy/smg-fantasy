import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
// import playersData from '../data/players.json';
import { X, ChevronDown } from 'lucide-react';
import round1PlayersMatch from '../data/gameweek1/roundPlayersMatch.json';
import round2PlayersMatch from '../data/gameweek2/roundPlayersMatch.json';
import round3PlayersMatch from '../data/gameweek3/roundPlayersMatch.json';

const MatchResult = ({ resultA, resultB }) => {
    return (
        <div className='flex bg-purple rounded-md py-1'>
            <span className='text-white px-2 border-r border-white text-sm'>{resultA}</span>
            <span className='text-white px-2 text-sm'>{resultB}</span>
        </div>
    );
}
const MatchRow = ({ teamA, teamB, resultA, resultB, time }) => {

    return (

        <div style={{ borderBottom: '1px solid rgba(55, 0, 60, 0.08)' }} className='flex-col border-b border-gray-500'>
            < div className='flex w-full py-3  px-2' >
                <div className='flex justify-center w-full items-center gap-5'>
                    <div className='text-xl font-bold'>{teamA}</div>
                    <MatchResult resultA={resultA} resultB={resultB} />

                    <div className='text-xl font-bold'>{teamB}</div>
                </div>
            </div >
        </div >
    );

}
const PlayerStats = ({ player }) => {
    const { selectedPlayerMatchMenu } = useAppContext();
    if (!player) return;
    let playerStatistic;
    if (selectedPlayerMatchMenu === 1) {
        playerStatistic = round1PlayersMatch.find((currPlayer) => currPlayer.name === player.name);
    } else if (selectedPlayerMatchMenu === 2) {
        playerStatistic = round2PlayersMatch.find((currPlayer) => currPlayer.name === player.name);
    } else if (selectedPlayerMatchMenu === 3) {
        playerStatistic = round3PlayersMatch.find((currPlayer) => currPlayer.name === player.name);
    } else {
        playerStatistic = {};
    }
    let breakdown;
    try {
        breakdown = playerStatistic.breakdown;
    } catch (err) {
        return;
    }
    if (!selectedPlayerMatchMenu) return;
    // Filter keys where value is not 0
    let stats, statisticKeys;
    try {
        stats = Object.entries(breakdown).filter(([key, value]) => value !== 0);
        statisticKeys = [];
        statisticKeys["goals"] = 'Goals';
        statisticKeys["assists"] = 'Assists';
        statisticKeys["cleanSheets"] = 'Clean Sheets';
        statisticKeys["saves"] = 'Saves';
        statisticKeys["minutes30"] = '30+ Minutes';
        statisticKeys["participation"] = 'Participation';
        statisticKeys["yellowCards"] = 'Yellow Cards';
        statisticKeys["redCards"] = 'Red Cards';
        statisticKeys["allowedGoals"] = 'Allowed Goals';
        statisticKeys["missedPenalties"] = 'Missed Penalties';
        statisticKeys["wonPenalties"] = 'Won Penalties';
        statisticKeys["playerOfMatch"] = 'Player of the Match';
    } catch (err) {

    }


    return (
        <div className="mt-4 space-y-4">
            {stats && stats.map(([key, value]) => (
                (key !== 'total' &&
                    <div key={key} className="flex items-center justify-between">
                        <span className="text-lg text-purple-900 capitalize">
                            {statisticKeys && statisticKeys[key]}
                        </span>
                        <div className="flex gap-8">
                            <span className="font-bold text-purple-900">
                                {value > 0 ? `${value} pts` : `${value} pts`}
                            </span>
                        </div>
                    </div>
                )
            ))}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-xl font-bold text-purple-900">Total Points</span>
                <span className="text-xl font-bold text-purple-900">
                    {breakdown && breakdown.total}pts
                </span>
            </div>
        </div>
    );
};

const PlayerMatchInfoMenu = () => {
    const { isPlayerMatchMenuOpen, setIsPlayerMatchMenuOpen, players, selectedSlot } = useAppContext();
    const sheetRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sheetRef.current && !sheetRef.current.contains(event.target)) {
                setIsPlayerMatchMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <>
            {/* Blurred background overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isPlayerMatchMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsPlayerMatchMenuOpen(false)}
            />

            <div id='player-info-match-menu' className="relative z-10">
                <div
                    ref={sheetRef}
                    className={`fixed inset-x-0 bottom-0 h-[80vh] bg-white rounded-t-[20px] shadow-lg transform transition-transform duration-300 ease-in-out ${isPlayerMatchMenuOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 320px, white 520px), url(https://fantasy.premierleague.com/static/media/pattern-1-437.2c3d86db.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '0px 0px, right -25px top -185px, 0px 0px',
                        backgroundSize: 'auto, 273px 387px, auto',
                    }}
                >
                    <div className='flex gap-4 py-5 px-5'>
                        <div>
                            {players[selectedSlot] && (<img
                                className='w-[100px] rounded-xl'
                                src={
                                    players[selectedSlot].team === '11А'
                                        ? '/img/A.svg'
                                        : players[selectedSlot].team === '11Б'
                                            ? '/img/B.svg'
                                            : players[selectedSlot].team === '11В'
                                                ? '/img/V.svg'
                                                : players[selectedSlot].team === '11Г'
                                                    ? '/img/G.svg'
                                                    : players[selectedSlot].team === '11Е'
                                                        ? '/img/E.svg'
                                                        : players[selectedSlot].team === '10'
                                                            ? '/img/10.svg'
                                                            : '/img/10.svg' // Default fallback image
                                }
                                alt='Player'
                            />)}
                        </div>
                        <div className='flex flex-col justify-center max-w-[200px]'>
                            <div className='bg-black rounded-md'>
                                <div
                                    style={{
                                        backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                    }}
                                    className='text-center uppercase'
                                >
                                    {players[selectedSlot] && players[selectedSlot].position}
                                </div>
                            </div>
                            <div className='font-bold text-2xl underline'>{players[selectedSlot] && players[selectedSlot].name}</div>
                            <div className='font-bold text-xl'>{players[selectedSlot] && players[selectedSlot].team}</div>
                        </div>
                    </div>
                    <div>
                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11А' || players[selectedSlot].team === '11Б') && (
                                <MatchRow teamA="11А" resultA={3} resultB={5} teamB="11Б" />
                            )
                        }
                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11Г' || players[selectedSlot].team === '10') && (
                                <MatchRow teamA="11Г" resultA={2} resultB={4} teamB="10" />
                            )
                        }
                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11В' || players[selectedSlot].team === '11Е') && (
                                <MatchRow teamA="11В" resultA={1} resultB={0} teamB="11Е" />
                            )
                        }

                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11А' || players[selectedSlot].team === '11В') && (
                                <MatchRow teamA="11А" resultA={2} resultB={1} teamB="11В" />
                            )
                        }
                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11Г' || players[selectedSlot].team === '11Е') && (
                                <MatchRow teamA="11Г" resultA={8} resultB={5} teamB="11Е" />
                            )
                        }
                        {players[selectedSlot] &&
                            (players[selectedSlot].team === '11Б' || players[selectedSlot].team === '10') && (
                                <MatchRow teamA="11Б" resultA={4} resultB={3} teamB="10" />
                            )
                        }

                        {/* Points breakdown */}
                        <div className="p-10 bg-[#ffffff70]">
                            <h2 className="text-2xl font-bold text-gray-900">Points Breakdown</h2>
                            {true && <PlayerStats player={players[selectedSlot]} />}
                        </div>
                    </div>
                    <div onClick={() => setIsPlayerMatchMenuOpen(false)} className='absolute top-[10px] right-[10px]'>
                        <X size={32} />
                    </div>
                </div>
            </div >
        </>
    );
}

export default PlayerMatchInfoMenu;