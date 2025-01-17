'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, Trophy, Medal, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const getLeaderboardData = (gameweek) => {
    if (gameweek === 3) {
        return import(`../../../data/leaderboard_all.json`).then(module => module.default);
    }
    return import(`../../../data/gameweek${gameweek}/leaderboard_round.json`).then(module => module.default);
};

const Table = ({ userData, data }) => {
    const getPositionIcon = (index) => {
        switch (index) {
            case 0:
                return <Trophy className="h-6 w-6 text-yellow-400" />;
            case 1:
                return <Medal className="h-6 w-6 text-gray-400" />;
            case 2:
                return <Medal className="h-6 w-6 text-amber-600" />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
                <tbody className='text-sm'>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`border-b border-gray-100 last:border-0 ${(userData.clubName === item.clubName && userData.name === item.name) ? 'bg-[#2D004D] text-white' :
                                index < 3 ? 'bg-gradient-to-r from-purple-50 to-purple-100' : 'hover:bg-gray-50'
                                }`}
                        >

                            <td className="px-4 py-3 text-center">
                                {index < 3 ? (
                                    <div className="flex items-center justify-center">
                                        {getPositionIcon(index)}
                                    </div>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <Link href={`/spectate/${item.uid}`} passHref>
                                    <div className="flex flex-col">
                                        <span className={
                                            userData.name === item.name ? 'text-[#4ADE80]' :
                                                index < 3 ? 'text-[#2D004D] font-bold' : 'text-[#2D004D] font-medium'
                                        }>
                                            {item.clubName}
                                        </span>
                                        <div className={
                                            userData.name === item.name ? 'text-gray-300 underline' :
                                                index < 3 ? 'text-purple-700 underline' : 'text-gray-500 underline'
                                        }>
                                            {item.name}
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className={`px-4 py-3 font-bold ${index < 3 ? 'text-lg' : ''
                                }`}>
                                {item.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const StandingsTable = ({ userData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [gameweek, setGameweek] = useState(2);
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getLeaderboardData(gameweek).then(leaderboardData => {
            setData(leaderboardData);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error loading leaderboard data:", error);
            setIsLoading(false);
        });
    }, [gameweek]);

    const handlePrevGameweek = () => {
        if (gameweek > 1) {
            setGameweek(gameweek - 1);
        }
    };

    const handleNextGameweek = () => {
        if (gameweek < 3) setGameweek(gameweek + 1);
    };

    return (
        <div className='pt-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto'>
            <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-purple text-center mb-8 tracking-tight'>STANDINGS</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevGameweek}
                    disabled={gameweek === 1}
                    className="p-2 rounded-full bg-purple-100 text-white disabled:opacity-50 bg-purple"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-purple-700">
                    {gameweek === 3 ? "Global Leaderboard" : `Gameweek ${gameweek}`}
                </h2>

                <button
                    onClick={handleNextGameweek}
                    className="p-2 rounded-full bg-purple-100 text-white bg-purple"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-purple" />
                </div>
            ) : (
                <Table userData={userData} data={data} />
            )}
        </div>
    )
}

export default StandingsTable;

