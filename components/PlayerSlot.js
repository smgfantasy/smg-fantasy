import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

const PlayerSlot = ({ img, name = 'Default', points = 'Nan', position }) => {
    const { variant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode, players, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation, setPlayers } = useAppContext();

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
        const possibleFormation = calculateNewFormation();
        return ['2-2-1', '2-1-2', '3-1-1'].includes(possibleFormation) ? possibleFormation : false;
    };

    const checkSwitch = () => {
        if (!switchMode) return true;
        if (position >= 10 || selectedSlot >= 10) {
            return Boolean(checkPossibleFormation());
        }
        return players[position].position === selectedSlotPos;
    };

    const handlePlayerClick = () => {
        if (switchMode) {
            console.log(selectedSlot, position);
            if (!checkSwitch()) return;
            swapPlayers(selectedSlot, position, (newPlayers) => {
                const newFormation = checkPossibleFormation();
                if (newFormation) {
                    const updatedPlayers = players.slice(0, 10).map(player => ({
                        id: player.id, // Keep the id same
                        name: null,
                        points: null,
                        team: null,
                        position: null,
                    }));
                    updatedPlayers[0] = newPlayers[0];
                    updatedPlayers[10] = newPlayers[10];
                    updatedPlayers[11] = newPlayers[11];
                    updatedPlayers[12] = newPlayers[12];

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
            console.log(position);
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

    return (

        <div
            onClick={handlePlayerClick}
            className={`${active ? '' : 'hidden'} ${checkSwitch() ? '' : 'opacity-50'} w-[60px] flex flex-col relative rounded-md duration-300 ${selectedSlot === position ? 'scale-110 ' : ''} ${(switchMode && selectedSlot === position) ? 'outline outline-2 outline-red' : ''}`}
        >
            <div className='w-[60px] h-[58px] bg-[#0e9d5e] rounded-t-md'>
                <img src={img} />
            </div>
            <div className='w-full bg-white text-center text-xs'>{name}</div>
            <div className='w-full bg-purple text-white text-center text-xs rounded-b-md'>{points}</div>
        </div>
    );
};

export default PlayerSlot;
