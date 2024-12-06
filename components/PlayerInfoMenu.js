'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import PlayerMatch from './PlayerMatch';
import { useAppContext } from '@/context/AppContext';
import PlayerStats from './PlayerStats';

const PlayerInfoMenu = ({ currVariant }) => {
    const { variant, setVariant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode } = useAppContext();

    const menuRef = useRef(null);

    const handleMenuClose = (fromX) => {
        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu) {
            playerMenu.style.maxHeight = '0px';
        }
        if (fromX) {
            setSelectedSlot(null);
            console.log("cleared!");
        };
    }
    useEffect(() => {
        setVariant(currVariant);

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && menuRef.current.style.maxHeight !== '0px') {
                setSelectedSlot(null);
                console.log("cleared");
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
        console.log(selectedSlot);
        handleMenuClose();
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
                    <img
                        className='w-[150px] rounded-xl'
                        src='https://cdn.discordapp.com/attachments/1313232515393261709/1313512685320540170/468545631_495631170160211_5667478025078618482_n.png?ex=67506784&is=674f1604&hm=24bd1afafe4cf716cbdfc29a283bebe0b93f4f5366676ea6a23a71922e08e13c&'
                        alt='Player'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='bg-black rounded-md'>
                        <div
                            style={{
                                backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                            className='text-center'
                        >
                            Defender
                        </div>
                    </div>
                    <div className='font-bold text-2xl underline'>Levi Colwill</div>
                    <div className='font-bold text-xl'>10A</div>
                </div>
            </div>
            <PlayerStats />
            <div className='mt-5 w-full flex gap-2 justify-around'>
                <PlayerMatch gameWeek={1} points={8} opponent={'11E'} />
                <PlayerMatch gameWeek={2} points={4} opponent={'11B'} />
                <PlayerMatch gameWeek={3} points={6} opponent={'11V'} />
                <PlayerMatch gameWeek={4} points={1} opponent={'10'} />
                <PlayerMatch gameWeek={5} points={9} opponent={'11G'} />
            </div>
            <div className="mt-5 w-full flex flex-col justify-center gap-4">
                {variant === "points" ? (

                    <div className="w-full bg-blue-500 text-center py-2 rounded-lg">
                        View Player Information
                    </div>
                ) : (
                    <>
                        <div className="w-full bg-[#963CFF] text-white text-center py-2 rounded-md" onClick={handleSwitchClick}>Switch</div>
                        <div className="w-full text-center py-2 rounded-md" style={{ backgroundImage: 'linear-gradient(to right, rgb(0, 255, 135), rgb(2, 239, 255))', }}>Make captain</div>
                        <div className="w-full bg-[#efefef] text-purple text-center py-2 rounded-md">Player Information</div>
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
