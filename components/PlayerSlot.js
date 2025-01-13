import React from 'react';
import { useAppContext } from '@/context/AppContext';
import playersData from '../data/players.json';
import PlayerSlotEmpty from './PlayerSlotEmpty';
import PlayerSlotContent from './PlayerSlotContent';
import calculateNewFormation from '@/functions/calculateNewFormation';
import checkPlayerSlotActive from '@/functions/checkPlayerSlotActive';
import calculateCurrPlayerPoints from '@/functions/caclulateCurrPlayerPoints';

const PlayerSlot = ({ name = 'Default', position, spectatedPlayers, spectatedFormation }) => {
    const { variant, selectedSlot, setSelectedSlot, switchMode, setSwitchMode, players, swapPlayers, selectedSlotPos, setSelectedSlotPos, formation, setFormation, setPlayers, setIsPlayerPickerMenuOpen, setPlayerPickerPos } = useAppContext();

    let playersArray, currFormation;
    if (spectatedPlayers) {
        playersArray = spectatedPlayers;
        currFormation = spectatedFormation;
    } else {
        playersArray = players;
        currFormation = formation;
    }

    const findPlayerByName = (name) => {
        return playersData.find(player => player.name.toLowerCase() === name.toLowerCase());
    };
    let playerTeam = '';
    try {
        playerTeam = findPlayerByName(name).team;
    } catch (err) {

    }

    const checkPossibleFormation = () => {
        let count = 0;
        for (let i in playersArray) {
            if (playersArray[i].name !== '') {
                count++;
            }
        }

        const possibleFormation = calculateNewFormation(position, selectedSlot, playersArray, playersArray);
        return ['2-2-1', '2-1-2', '3-1-1'].includes(possibleFormation) ? possibleFormation : false;
    };

    const checkSwitch = () => {
        if (!switchMode) return true;
        if (playersArray[position].position === playersArray[selectedSlot].position) return true;
        if ((position >= 10) !== (selectedSlot >= 10)) {
            return Boolean(checkPossibleFormation());
        }
        return playersArray[position].position === selectedSlotPos;
    };

    const handlePlayerClick = () => {

        if (spectatedPlayers) return;

        if (playersArray[position].name === "" && !switchMode) {
            setIsPlayerPickerMenuOpen(true);
            setPlayerPickerPos(position);
            return;
        }

        if (switchMode) {
            if (!checkSwitch()) return;
            console.log(playersArray[selectedSlot].position, playersArray[position].position);
            swapPlayers(selectedSlot, position, (newPlayers) => {
                const newFormation = checkPossibleFormation();
                let count = 0;
                for (let i in playersArray) {
                    if (playersArray[i].name !== '') {
                        count++;
                    }
                }
                if (newFormation) {
                    const updatedPlayers = playersArray.slice(0, 10).map(player => ({
                        id: player.id,
                        name: '',
                        points: null,
                        team: '',
                        position: '',
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
            setSelectedSlotPos(playersArray[position].position);
        }

        if (switchMode) {
            setSwitchMode(false);
            setSelectedSlot(null);
            return;
        }

        const playerMenu = document.querySelector('#player-menu');
        if (playerMenu) {
            if (playerMenu.style.maxHeight === '' || playerMenu.style.maxHeight === '0px') {
                if (variant === "points") playerMenu.style.maxHeight = 550 + 'px';
                else playerMenu.style.maxHeight = 600 + 'px';
            } else {
                playerMenu.style.maxHeight = '0px';
            }
        }
    }

    const active = checkPlayerSlotActive(position, currFormation);
    const currPlayerPoints = calculateCurrPlayerPoints(name, playersArray);
    return (
        <div
            onClick={handlePlayerClick}
            className={`${active ? '' : 'hidden'} ${checkSwitch() ? '' : 'opacity-50'} w-[60px] flex flex-col relative rounded-md duration-300 ${selectedSlot === position ? 'scale-110 ' : ''} ${(switchMode && selectedSlot === position) ? 'outline outline-2 outline-red' : ''}`}
        >
            {name === '' ? (
                <PlayerSlotEmpty position={position}></PlayerSlotEmpty>
            ) : (
                <PlayerSlotContent playersArray={playersArray} position={position} playerTeam={playerTeam} currPlayerPoints={currPlayerPoints} name={name}></PlayerSlotContent>
            )}

        </div>
    );
};

export default PlayerSlot;

