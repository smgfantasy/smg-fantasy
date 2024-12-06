import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { UserPlus } from 'lucide-react';
import PlayerPickerMenu from './PlayerPickerMenu';
import playersData from '../data/players.json';

const PlayerSlot = ({ img, name = 'Default', points = '0', position }) => {
    const { variant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode, players, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation, setPlayers, isPlayerPickerMenuOpen, setIsPlayerPickerMenuOpen, playerPickerPos, setPlayerPickerPos } = useAppContext();

    const findPlayerByName = (name) => {
        return playersData.find(player => player.name.toLowerCase() === name.toLowerCase());
    };
    let playerTeam = '';
    try {
        playerTeam = findPlayerByName(name).team;
    } catch (err) {

    }
    const calculateNewFormation = () => {
        const index1 = position, index2 = selectedSlot;

        if (index1 === 0 || index2 === 0) return '';
        const array = [...players];
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        let defs = 0, mids = 0, fwds = 0;
        for (let i = 0; i <= 9; i++) {
            if (array[i].position === 'def') defs++;
            if (array[i].position === 'mid') mids++;
            if (array[i].position === 'fwd') fwds++;
        }
        return `${defs}-${mids}-${fwds}`;
    };

    const checkPossibleFormation = () => {
        let count = 0;
        for (let i in players) {
            if (players[i].name !== '') {
                count++;
            }
        }
        // if (count < 9 && players[position] === players[selectedSlot]) return '2-1-2';

        const possibleFormation = calculateNewFormation();
        return ['2-2-1', '2-1-2', '3-1-1'].includes(possibleFormation) ? possibleFormation : false;
    };

    const checkSwitch = () => {
        if (!switchMode) return true;
        if (players[position].position === players[selectedSlot].position) return true;
        if (position >= 10 || selectedSlot >= 10) {
            return Boolean(checkPossibleFormation());
        }
        return players[position].position === selectedSlotPos;
    };

    const handlePlayerClick = () => {
        console.log(players);

        if (players[position].name === "" && !switchMode) {
            setIsPlayerPickerMenuOpen(true);
            setPlayerPickerPos(position);
            return;
        }

        if (switchMode) {
            if (!checkSwitch()) return;
            console.log(players[selectedSlot].position, players[position].position);
            swapPlayers(selectedSlot, position, (newPlayers) => {
                const newFormation = checkPossibleFormation();
                let count = 0;
                for (let i in players) {
                    if (players[i].name !== '') {
                        count++;
                    }
                }
                if (newFormation) {
                    const updatedPlayers = players.slice(0, 10).map(player => ({
                        id: player.id, // Keep the id same
                        name: '',
                        points: null,
                        team: '',
                        position: '',
                    }));
                    updatedPlayers[0] = newPlayers[0];
                    updatedPlayers[10] = newPlayers[10];
                    updatedPlayers[11] = newPlayers[11];
                    updatedPlayers[12] = newPlayers[12];
                    console.log("Updated players: " + updatedPlayers);
                    if (newFormation === "2-2-1") {
                        let flag = false;
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "def") {
                                if (!flag) {
                                    updatedPlayers[1] = newPlayers[i];
                                    flag = true;
                                } else {
                                    updatedPlayers[3] = newPlayers[i];
                                    break;
                                }
                            }
                        }
                        flag = false;
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "mid") {
                                if (!flag) {
                                    updatedPlayers[4] = newPlayers[i];
                                    flag = true;
                                } else {
                                    updatedPlayers[6] = newPlayers[i];
                                    break;
                                }
                            }
                        }
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "fwd") {
                                updatedPlayers[8] = newPlayers[i];
                                break;
                            }
                        }
                    }

                    if (newFormation === "2-1-2") {
                        let flag = false;
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "def") {
                                if (!flag) {
                                    updatedPlayers[1] = newPlayers[i];
                                    flag = true;
                                } else {
                                    updatedPlayers[3] = newPlayers[i];
                                    break;
                                }
                            }
                        }
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "mid") {
                                updatedPlayers[5] = newPlayers[i];
                                break;
                            }
                        }
                        flag = false;
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "fwd") {
                                if (!flag) {
                                    updatedPlayers[7] = newPlayers[i];
                                    flag = true;
                                } else {
                                    updatedPlayers[9] = newPlayers[i];
                                    break;
                                }
                            }
                        }
                    }

                    if (newFormation === "3-1-1") {
                        let flag = 0;
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "def") {
                                if (flag === 0) {
                                    updatedPlayers[1] = newPlayers[i];
                                    flag++;
                                } else if (flag === 1) {
                                    updatedPlayers[2] = newPlayers[i];
                                    flag++;
                                } else {
                                    updatedPlayers[3] = newPlayers[i];
                                    break;
                                }
                            }
                        }
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "mid") {
                                updatedPlayers[5] = newPlayers[i];
                                break;
                            }
                        }
                        for (let i = 1; i <= 9; i++) {
                            if (newPlayers[i].position === "fwd") {
                                updatedPlayers[8] = newPlayers[i];
                                break;
                            }
                        }
                    }

                    setPlayers(updatedPlayers);

                    setFormation(newFormation);
                }
            });
        } else {
            setSelectedSlot(position);
            setSelectedSlotPos(players[position].position);
            console.log('text ', players[position].position);
        }

        if (switchMode) {
            setSwitchMode(false);
            setSelectedSlot(null);
            return;
        }

        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu.style.maxHeight === '' || playerMenu.style.maxHeight === '0px') {
            if (variant === "points") playerMenu.style.maxHeight = 550 + 'px';
            else playerMenu.style.maxHeight = 600 + 'px';
        } else {
            playerMenu.style.maxHeight = '0px';
        }

    }

    let active = false;
    if (formation === '2-1-2' && (position === 1 || position === 3 || position === 5 || position === 7 || position === 9)) active = true;
    if (formation === '2-2-1' && (position === 1 || position === 3 || position === 4 || position === 6 || position === 8)) active = true;
    if (formation === '3-1-1' && (position === 1 || position === 2 || position === 3 || position === 5 || position === 8)) active = true;
    if (position > 9 || position === 0) active = true;

    function getPlayerPosition() {
        if (position === 0) return "gk"
        if (position >= 1 && position <= 3) return 'def';
        if (position >= 4 && position <= 6) return 'mid';
        if (position >= 7 && position <= 9) return 'fwd';
        if (position === 10) return 'def';
        if (position === 11 || position === 12) return 'mid';
        return 'pos'; // Default if pos is undefined or out of range
    }

    return (
        <div
            onClick={handlePlayerClick}
            className={`${active ? '' : 'hidden'} ${checkSwitch() ? '' : 'opacity-50'} w-[60px] flex flex-col relative rounded-md duration-300 ${selectedSlot === position ? 'scale-110 ' : ''} ${(switchMode && selectedSlot === position) ? 'outline outline-2 outline-red' : ''}`}
        >
            {name === '' ? (
                <div className="w-[60px] h-[82px] bg-[#0e9d5e] rounded-md flex flex-col items-center justify-center text-white">
                    <div className="w-6 h-6">
                        <UserPlus />
                    </div>
                    <div className="mt-1 text-sm font-medium">
                        {getPlayerPosition(players[position]?.position)}
                    </div>
                </div>
            ) : (
                <>
                    <div className='w-[60px] h-[58px] bg-[#0e9d5e] rounded-t-md'>
                        {playerTeam !== '' && (<img className='rounded-t-md' src={
                            playerTeam === '11А'
                                ? '/img/A.svg'
                                : playerTeam === '11Б'
                                    ? '/img/B.svg'
                                    : playerTeam === '11В'
                                        ? '/img/V.svg'
                                        : playerTeam === '11Г'
                                            ? '/img/G.svg'
                                            : playerTeam === '11Е'
                                                ? '/img/E.svg'
                                                : playerTeam === '10'
                                                    ? '/img/10.svg'
                                                    : '' // Default fallback image
                        } />)}
                    </div>
                    <div className='w-full bg-white text-center text-xs overflow-hidden'>{name.split(" ")[1]}</div>
                    <div className='w-full bg-purple text-white text-center text-xs rounded-b-md'>{points}</div>
                </>
            )}
        </div>
    );
};

export default PlayerSlot;

