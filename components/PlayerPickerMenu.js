import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import playersData from '../data/players.json';

export default function PlayerPickerMenu() {
    const { isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen, playerPickerPos, setPlayerPickerPos, players, setPlayers, currBudget, benchPos, originalPlayers, setMadeTransfers } = useAppContext();
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

    let pos = "pos";
    if (playerPickerPos === 0) pos = "gk"
    if (playerPickerPos >= 1 && playerPickerPos <= 3) pos = 'def';
    if (playerPickerPos >= 4 && playerPickerPos <= 6) pos = 'mid';
    if (playerPickerPos >= 7 && playerPickerPos <= 9) pos = 'fwd';
    if (playerPickerPos === 10) pos = benchPos[0] === '' ? 'def' : benchPos[0];
    if (playerPickerPos === 11) pos = benchPos[1] === '' ? 'mid' : benchPos[1];
    if (playerPickerPos === 12) pos = benchPos[2] === '' ? 'mid' : benchPos[2];
    const checkIfPlayerIsUsed = (name) => {
        for (let i in players) {
            if (players[i].name === name) {
                return true;
            }
        }
        return false;
    }
    const canAddPlayer = (newPlayer) => {
        const teamCounts = {};

        // Count the current number of players per team
        players.forEach((player) => {
            if (player?.team) {
                teamCounts[player.team] = (teamCounts[player.team] || 0) + 1;
            }
        });

        // Check if adding the new player exceeds the limit
        return (teamCounts[newPlayer.team] || 0) < 2;
    };
    useEffect(() => {
        const filteredPlayers = playersData.filter(player =>
            ((playerPickerPos < 10 && player.position === pos) || (benchPos[playerPickerPos - 10] !== ""
                ? player.position === benchPos[playerPickerPos - 10]
                : player.position === pos)) &&
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !checkIfPlayerIsUsed(player.name) &&
            currBudget >= player.price &&
            canAddPlayer(player)
        );
        setPlayersList(filteredPlayers);
    }, [pos, searchTerm, players, currBudget]);

    function countNameDifferences(arr1, arr2) {
        // Helper function to get valid names from an array
        // try {


        const extractValidNames = (arr) =>
            arr
                .map(player => player.name.trim())
                .filter(name => name !== ""); // Skip empty names

        // Extract valid names
        const names1 = new Set(extractValidNames(arr2)); // Convert arr1 names to a Set
        const names2 = extractValidNames(arr1); // Extract names from arr2

        // Count how many names in arr2 are not in names1
        const differences = names2.filter(name => !names1.has(name)).length;
        return differences;
        // } catch (err) {
        // window.location.reload();
        console.log(err.message)
        // }

    }

    const handlePlayerClick = (index) => {
        setIsPlayerPickerMenuOpen(false);
        setPlayerPickerPos(false);

        const tempPlayers = [...players];
        tempPlayers[playerPickerPos] = playersList[index];

        console.log("temp:", tempPlayers, "orig:", originalPlayers);

        console.log(countNameDifferences(tempPlayers, originalPlayers));

        setMadeTransfers(countNameDifferences(tempPlayers, originalPlayers))

        setPlayers(tempPlayers);
    }

    useEffect(() => {
        if (players.length === 0) return;

        const tempPlayers = [...players];
        setMadeTransfers(countNameDifferences(tempPlayers, originalPlayers));
    }, [players]);

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
                                    {pos === 'def' && 'Defenders'}
                                    {pos === 'fwd' && 'Forwards'}
                                    {pos === 'mid' && 'Midfielders'}
                                    {pos === 'gk' && 'Goalkeepers'}
                                </span>
                            </span>
                        </div>
                        <div className="space-y-2">
                            {playersList
                                .map((player, index) => (
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
                                                <div className="font-semibold">{player.name === "Никола Кунчев" ? "Александър Маринов" : player.name}</div>
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