import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import playersData from '../data/players.json';

export default function PlayerPickerMenu() {
    const { isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen, playerPickerPos, setPlayerPickerPos, players, setPlayers } = useAppContext();
    const sheetRef = useRef(null);
    const [playersList, setPlayersList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sheetRef.current && !sheetRef.current.contains(event.target)) {
                setIsPlayerPickerMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let pos = "POS";
    if (playerPickerPos === 0) pos = "GK"
    if (playerPickerPos >= 1 && playerPickerPos <= 3) pos = 'DEF';
    if (playerPickerPos >= 4 && playerPickerPos <= 6) pos = 'MID';
    if (playerPickerPos >= 7 && playerPickerPos <= 9) pos = 'FWD';
    if (playerPickerPos === 10) pos = 'DEF';
    if (playerPickerPos === 11 || playerPickerPos === 12) pos = 'MID';

    useEffect(() => {
        const filteredPlayers = playersData.filter(player =>
            player.position === pos &&
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPlayersList(filteredPlayers);
    }, [pos, searchTerm]);

    const handlePlayerClick = (index) => {
        setIsPlayerPickerMenuOpen(false);
        setPlayerPickerPos(false);

        console.log(playersList[index]);
        const tempPlayers = [...players];
        tempPlayers[playerPickerPos] = playersList[index];
        console.log(tempPlayers);

        setPlayers(tempPlayers);
    }

    return (
        <>
            {/* Blurred background overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isPlayerPickerMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsPlayerPickerMenuOpen(false)}
            />

            <div className="relative">
                <div
                    ref={sheetRef}
                    className={`fixed inset-x-0 bottom-0 h-[80vh] bg-white rounded-t-[20px] shadow-lg transform transition-transform duration-300 ease-in-out ${isPlayerPickerMenuOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}
                >
                    <div className="h-16 bg-gradient-to-r from-[#84f7a5] to-[#7ee7f1] flex items-center justify-center">
                        <h2 className="text-xl font-normal">{playersList.length} Players</h2>
                    </div>
                    <div className="p-5 overflow-y-auto h-[calc(100%-4rem)]">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search players..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='w-full border-t border-gray-200'>
                            <span className='bg-purple px-4 py-1 rounded-b-xl '>
                                <span
                                    style={{ backgroundImage: 'linear-gradient(to right, rgb(5, 240, 255), rgb(0, 255, 135))', backgroundClip: 'text' }}
                                    className='text-sm font-bold text-transparent'
                                >
                                    {pos === 'DEF' && 'Defenders'}
                                    {pos === 'FWD' && 'Forwards'}
                                    {pos === 'MID' && 'Midfielders'}
                                    {pos === 'GK' && 'Goalkeepers'}
                                </span>
                            </span>
                        </div>
                        <div className="space-y-2">
                            {playersList.map((player, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border-b"
                                    onClick={() => handlePlayerClick(index)}
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                player.team === '11А'
                                                    ? '/img/A.svg'
                                                    : player.team === '11Б'
                                                        ? '/img/B.svg'
                                                        : player.team === '11В'
                                                            ? '/img/V.svg'
                                                            : player.team === '11Г'
                                                                ? '/img/G.svg'
                                                                : player.team === '11Е'
                                                                    ? '/img/E.svg'
                                                                    : player.team === '10'
                                                                        ? '/img/10.svg'
                                                                        : '/img/10.svg' // Default fallback image
                                            }
                                            alt={`${player.team} jersey`}
                                            className="w-20 h-20 object-cover"
                                        />
                                        <div>
                                            <div className="font-semibold">{player.name}</div>
                                            <div className="text-sm text-gray-600">
                                                {player.team} {player.position}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-lg font-medium text-green-500">{player.price}M$</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}