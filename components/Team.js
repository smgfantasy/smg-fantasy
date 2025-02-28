'use client';

import React, { useEffect, useState } from 'react';
import Subs from './Subs';
import { useAppContext } from '@/context/AppContext';
import getUserTeam from '@/utils/team/getUserTeam';
import PlayerPickerMenu from './PlayerPickerMenu';
import { SaveAll } from 'lucide-react';
import updateUserTeam from '@/utils/team/updateTeam';
import roundPlayers from '../data/gameweek2/roundPlayers.json';
import PlayerMatchInfoMenu from './PlayerMatchInfoMenu';
import PitchContent from './PitchContent';
import getUserMadeTransfers from '@/utils/team/getUserTransfers';

const StatItem = ({ label, value, highlightClass }) => {
    return (
        <div className="flex flex-col justify-center w-1/3 gap-2">
            <div>{label}</div>
            <div className={`font-bold ${highlightClass || ''}`}>{value}</div>
        </div>
    );
};

const TransferInfo = ({ freeTransfers, cost, budget }) => {
    return (
        <div className="flex justify-center text-xs font-light text-purple gap-4 mx-12">
            <StatItem label="Free transfers" value={freeTransfers} />
            <StatItem
                label="Cost"
                value={`${cost} pts`}
                highlightClass={cost > 0 ? 'bg-red text-white rounded-sm' : ''}
            />
            <StatItem
                label="Budget"
                value={budget}
                highlightClass={"bg-green-500 text-white rounded-sm"}
            />
        </div>
    );
};

const Header = () => {
    const { players, currBudget, setCurrBudget, madeTransfers, originalTransfers } = useAppContext();
    const [freeTransfers, setFreeTransfers] = useState(null);
    const [cost, setCost] = useState(null);
    useEffect(() => {
        let sum = 0;
        for (let i in players) {
            if (players[i].price) sum += players[i].price;
            // console.log(players[i].price);
        }
        setCurrBudget(60 - sum);

        // console.log(round1Players);


    }, [players, players.length]);

    useEffect(() => {
        const MAX_TRANSFERS = 2;
        // window.location.reload();
        let currCost = (madeTransfers - (MAX_TRANSFERS - originalTransfers)) * 8;
        if (madeTransfers <= MAX_TRANSFERS - originalTransfers) currCost = 0;
        setCost(currCost);

        let freeTrans = (MAX_TRANSFERS - originalTransfers) - madeTransfers;
        if (freeTrans < 0) freeTrans = 0;
        setFreeTransfers(freeTrans);
    }, [players, originalTransfers]);


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
                        Gameweek 1:
                        <span className='font-bold font text-sm'> Sat 7 Dec 13:00</span>
                    </div>
                    <div className='h-px w-full mb-4' style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)' }}></div>
                    <TransferInfo freeTransfers={freeTransfers} cost={cost} budget={currBudget} />
                </div>
            </div>
        </>
    );
}

const Pitch = ({ sessionCookie, userData }) => {
    const { players, setPlayers, setFormation, setOriginalPlayers, setOriginalTransfers } = useAppContext();
    const calculateNewFormation = (array) => {

        let defs = 0, mids = 0, fwds = 0;
        for (let i = 0; i <= 9; i++) {
            if (array[i].position === 'def') defs++;
            if (array[i].position === 'mid') mids++;
            if (array[i].position === 'fwd') fwds++;
        }
        return `${defs}-${mids}-${fwds}`;
    };

    useEffect(() => {
        const fetchTeamData = async () => {
            const origTrans = await getUserMadeTransfers(sessionCookie);
            setOriginalTransfers(origTrans);

            try {
                const currUserUid = userData.uid;

                const element = roundPlayers.teams.find((a) => a.documentId === currUserUid);
                setOriginalPlayers(element.teams);


                // Check if data exists in localStorage
                const storedPlayers = localStorage.getItem("user-team-v4");
                if (storedPlayers) {
                    setPlayers(JSON.parse(storedPlayers));
                    let savedFormation = calculateNewFormation(JSON.parse(storedPlayers));
                    if (savedFormation === '0-0-0') savedFormation = '2-1-2';
                    setFormation(savedFormation);
                    return;
                }

                // Fetch data from the server if not in localStorage
                const data = await getUserTeam(sessionCookie);
                if (data) {
                    setPlayers(data.team);
                    let savedFormation = calculateNewFormation(data.team);
                    if (savedFormation === '0-0-0') savedFormation = '2-1-2';
                    setFormation(savedFormation);
                    // Save the fetched data to localStorage
                    localStorage.setItem("user-team-v4", JSON.stringify(data.team));
                } else {
                    console.error("Failed to fetch team data");
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        // Call the function if players array is empty
        if (players.length === 0) {
            fetchTeamData();
        }

        //! TODO: Remove this function if it is not used. 
        // function countNameDifferences(arr1, arr2) {
        //     // Helper function to get valid names from an array
        //     const extractValidNames = (arr) =>
        //         arr
        //             .map(player => player.name.trim())
        //             .filter(name => name !== ""); // Skip empty names


        //     const names1 = new Set(extractValidNames(arr2));
        //     const names2 = extractValidNames(arr1);

        //     const differences = names2.filter(name => !names1.has(name)).length;

        //     return differences;
        // }
    }, [players.length, sessionCookie, setPlayers]);

    return (
        <PitchContent players={players}></PitchContent>
    );
}
const Team = ({ sessionCookie, userData }) => {
    const { players, setPlayers, madeTransfers } = useAppContext();
    const [readySave, setReadySave] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    useEffect(() => {
        let count = 0;
        for (let i in players) {
            if (players[i].name !== '') {
                count++;

            }
        }
        if (count === 9) setReadySave(true);
    }, [players, players.length]);

    const handleTeamSave = async () => {
        setLoading(true);
        try {
            // Update the server with the current players data
            await updateUserTeam(sessionCookie, players, madeTransfers);

            // Update localStorage with the new players data
            localStorage.setItem("user-team-v4", JSON.stringify(players));
        } catch (err) {
            console.error(err); // Fix typo: use console.error instead of console.err
        } finally {
            setLoading(false);
        }
    };

    const handleTeamReset = async () => {

        setLoadingReset(true)
        try {

            const element = roundPlayers.teams.find((a) => a.documentId === userData.uid);
            await updateUserTeam(sessionCookie, element.teams, 0);
            localStorage.setItem("user-team-v4", JSON.stringify(element.teams));
            setPlayers(element.teams);
            location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingReset(false);
        }
    }


    return (
        <>
            <div className='pt-8 px-1'>
                <div className="flex flex-col justify-between items-center mb-2 gap-5">
                    <h1 className='font-bold text-xl text-purple'>Pick Team - {userData.name}</h1>
                    <div className='flex gap-5'>
                        {/* <button onClick={handleTeamSave}
                            className={`relative overflow-hidden text-white px-6 py-2 rounded-md flex items-center group ${!readySave ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={!readySave}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-out transform group-hover:scale-105"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></span>
                            <SaveAll className="w-5 h-5 mr-2 relative z-2" />
                            <span className="relative z-2">{loading ?
                                <span className='animate-spin text-2xl flex items-center justify-center'>
                                    <div style={{ width: '24px', height: '24px' }}>
                                        <svg className="group-hover:stroke-primary stroke-white" viewBox="22 22 44 44" style={{ width: '100%', height: '100%' }}>
                                            <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" strokeDasharray="80px, 200px" strokeDashoffset="0" className='spinner-circle'></circle>
                                        </svg>
                                    </div>
                                </span> :
                                <>Save team</>
                            }</span>
                        </button>
                        <button onClick={handleTeamReset}
                            className={`relative overflow-hidden text-white px-6 py-2 rounded-md flex items-center group ${!readySave ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={!readySave}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red transition-all duration-300 ease-out transform group-hover:scale-105"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></span>
                            <SaveAll className="w-5 h-5 mr-2 relative z-2" />
                            <span className="relative z-2">{loadingReset ?
                                <span className='animate-spin text-2xl flex items-center justify-center'>
                                    <div style={{ width: '24px', height: '24px' }}>
                                        <svg className="group-hover:stroke-primary stroke-white" viewBox="22 22 44 44" style={{ width: '100%', height: '100%' }}>
                                            <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" strokeDasharray="80px, 200px" strokeDashoffset="0" className='spinner-circle'></circle>
                                        </svg>
                                    </div>
                                </span> :
                                <>Reset Team</>
                            }</span>
                        </button> */}
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 60px, rgba(255, 255, 255, 0.5) 150px, white 240px), url(https://fantasy.premierleague.com/static/media/pattern-2-crop-90.0e86ae39.png), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255))',
                        backgroundSize: 'auto, 90px 60px, auto',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '0px center, right top, 0px center'
                    }}
                    className='mt-0 w-full bg-[#2C3E50] h-[650px] rounded-md'
                >
                    <Header />
                    <Pitch sessionCookie={sessionCookie} userData={userData} />
                </div>
                <Subs />
            </div>
            <PlayerPickerMenu />
            <PlayerMatchInfoMenu />
        </>
    )
}
export default Team;