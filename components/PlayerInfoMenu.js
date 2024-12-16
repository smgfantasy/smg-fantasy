'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import PlayerMatch from './PlayerMatch';
import { useAppContext } from '@/context/AppContext';
import PlayerStats from './PlayerStats';
import { ArrowRight, Star, Trash2 } from 'lucide-react';
import playersPointsRound1 from '../data/round1Points.json';

const enableChanges = true;

const PlayerInfoMenu = ({ currVariant }) => {
    const { variant, setVariant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode, players, setPlayers, benchPos, setBenchPos } = useAppContext();

    const menuRef = useRef(null);

    const handleMenuClose = (fromX) => {
        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu) {
            playerMenu.style.maxHeight = '0px';
        }
        if (fromX) {
            setSelectedSlot(null);
        };
    }
    useEffect(() => {
        setVariant(currVariant);

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && menuRef.current.style.maxHeight !== '0px' && !document.querySelector('#player-info-match-menu').contains(event.target)) {
                setSelectedSlot(null);
                handleMenuClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSwitchClick = () => {
        if (!enableChanges) {
            // TODO: Show toast that indicates that no changes can be made at the moment

            return;
        }
        setSwitchMode(true);
        handleMenuClose();
    }

    const handleRemovePlayer = () => {

        if (!enableChanges) {
            // TODO: Show toast that indicates that no changes can be made at the moment

            return;

        }

        const tempPlayers = [...players];
        const copy = [...benchPos];
        copy[selectedSlot - 10] = tempPlayers[selectedSlot].position;
        if (selectedSlot >= 10) setBenchPos(copy);
        tempPlayers[selectedSlot] = { name: "", points: null, team: "", position: "", price: "" };
        setPlayers(tempPlayers);
        handleMenuClose(true);
    }

    const handleMakeCaptain = () => {
        if (!enableChanges) {
            // TODO: Show toast that indicates that no changes can be made at the moment

            return;
        }
        const array = [...players];

        for (let i = 0; i < array.length; i++) {
            array[i].captain = false;
        }
        array[selectedSlot].captain = true;
        setPlayers(array);
        handleMenuClose(true);
    }
    const returnMatch = (team, index) => {
        const masA = ['11Б', '11В', '11Е', '10', '11Г'];
        const masB = ['11А', '10', '11Г', '11Е', '11В'];
        const masC = ['11E', '11A', '10', '11Г', '11Б'];
        const masD = ['10', '11Е', '11Б', '11В', '11А'];
        const masE = ['11В', '11Г', '11А', '11Б', '10'];
        const masF = ['11Г', '11Б', '11В', '11А', '11Е'];
        if (team === '11А') return masA[index];
        if (team === '11Б') return masB[index];
        if (team === '11В') return masC[index];
        if (team === '11Г') return masD[index];
        if (team === '11Е') return masE[index];
        if (team === '10') return masF[index];
    };
    const getRound1PlayerPoints = (targetPlayer) => {
        try {
            return playersPointsRound1.find(player => player.name === targetPlayer.name).points;
        } catch (e) {
            return '-';
        }

    }
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${(selectedSlot || selectedSlot === 0) && !switchMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            />
            <div
                id='player-menu'
                ref={menuRef}
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 320px, white 520px), url(https://fantasy.premierleague.com/static/media/pattern-1-437.2c3d86db.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0px 0px, right -25px top -185px, 0px 0px',
                    backgroundSize: 'auto, 273px 387px, auto',
                }}
                className={`fixed bottom-0 left-0 w-screen ${variant === "points" ? "h-[500px]" : "h-[600px]"} px-6 max-h-0 duration-300`}
            >
                <div className='flex gap-4 py-5'>
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
                <PlayerStats />
                {players[selectedSlot] && <div className='mt-5 w-full flex gap-2 justify-around'>
                    <PlayerMatch gameWeek={1} points={getRound1PlayerPoints(players[selectedSlot])} opponent={returnMatch(players[selectedSlot].team, 0)} />
                    <PlayerMatch gameWeek={2} points="-" opponent={returnMatch(players[selectedSlot].team, 1)} />
                    <PlayerMatch gameWeek={3} points="-" opponent={returnMatch(players[selectedSlot].team, 2)} />
                    <PlayerMatch gameWeek={4} points="-" opponent={returnMatch(players[selectedSlot].team, 3)} />
                    <PlayerMatch gameWeek={5} points="-" opponent={returnMatch(players[selectedSlot].team, 4)} />
                </div>}

                <div className="mt-5 w-full flex flex-col justify-center gap-4">
                    {variant === "points" ? (

                        <div className="w-full bg-blue-500 text-center py-2 rounded-lg">
                            View Player Information
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <div
                                    className={`w-full bg-[#963CFF] text-white text-center py-2 rounded-md flex items-center justify-center gap-2 ${enableChanges ? 'opacity-100' : 'opacity-50'}`}
                                    onClick={handleSwitchClick}
                                >
                                    <ArrowRight size={20} />
                                    <span>Switch</span>
                                </div>

                                <div onClick={handleMakeCaptain}
                                    className={`w-full text-center py-2 rounded-md flex items-center justify-center gap-2 ${enableChanges ? 'opacity-100' : 'opacity-50'}`}
                                    style={{
                                        backgroundImage: "linear-gradient(to right, rgb(0, 255, 135), rgb(2, 239, 255))",
                                    }}
                                >
                                    <Star size={20} />
                                    <span>Make Captain</span>
                                </div>

                                <div onClick={handleRemovePlayer}
                                    className={`w-full bg-red text-white text-center py-2 rounded-md flex items-center justify-center gap-2 ${enableChanges ? 'opacity-100' : 'opacity-50'}`}
                                >
                                    <Trash2 size={20} />
                                    <span>Remove Player</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div onClick={() => handleMenuClose(true)} className='absolute top-[10px] right-[10px]'>
                    <X size={32} />
                </div>
            </div>
        </>
    );
};

export default PlayerInfoMenu;
