'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import PlayerMatch from './PlayerMatch';
import { useAppContext } from '@/context/AppContext';
import PlayerStats from './PlayerStats';
import { ArrowRight, Star, Trash2 } from 'lucide-react';

const PlayerInfoMenu = ({ currVariant }) => {
    const { variant, setVariant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode, players, setPlayers } = useAppContext();

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
            if (menuRef.current && !menuRef.current.contains(event.target) && menuRef.current.style.maxHeight !== '0px') {
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
        setSwitchMode(true);
        handleMenuClose();
    }

    const handleRemovePlayer = () => {
        const tempPlayers = [...players];
        tempPlayers[selectedSlot] = { name: "", points: null, team: "", position: "", price: "" };
        setPlayers(tempPlayers);
        handleMenuClose(true);
    }

    return (
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
            <div className='mt-5 w-full flex gap-2 justify-around'>
                <PlayerMatch gameWeek={1} points={'-'} opponent={'11E'} />
                <PlayerMatch gameWeek={2} points={'-'} opponent={'11B'} />
                <PlayerMatch gameWeek={3} points={'-'} opponent={'11V'} />
                <PlayerMatch gameWeek={4} points={'-'} opponent={'10'} />
                <PlayerMatch gameWeek={5} points={'-'} opponent={'11G'} />
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-4">
                {variant === "points" ? (

                    <div className="w-full bg-blue-500 text-center py-2 rounded-lg">
                        View Player Information
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div
                                className="w-full bg-[#963CFF] text-white text-center py-2 rounded-md flex items-center justify-center gap-2"
                                onClick={handleSwitchClick}
                            >
                                <ArrowRight size={20} />
                                <span>Switch</span>
                            </div>

                            <div
                                className="w-full text-center py-2 rounded-md flex items-center justify-center gap-2"
                                style={{
                                    backgroundImage: "linear-gradient(to right, rgb(0, 255, 135), rgb(2, 239, 255))",
                                }}
                            >
                                <Star size={20} />
                                <span>Make Captain</span>
                            </div>

                            <div onClick={handleRemovePlayer}
                                className="w-full bg-red text-white text-center py-2 rounded-md flex items-center justify-center gap-2"
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
    );
};

export default PlayerInfoMenu;
