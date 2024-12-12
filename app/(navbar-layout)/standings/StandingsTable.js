'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, Trophy, Medal } from 'lucide-react';
import Link from 'next/link';
import data from '../../../data/leaderboard_round_1.json';

const Table = ({ userData }) => {
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
                            className={`border-b border-gray-100 last:border-0 ${userData.clubName === item.clubName ? 'bg-[#2D004D] text-white' :
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
                                <div className="flex flex-col">
                                    <span className={
                                        userData.name === item.name ? 'text-[#4ADE80]' :
                                            index < 3 ? 'text-[#2D004D] font-bold' : 'text-[#2D004D] font-medium'
                                    }>
                                        {item.clubName}
                                    </span>
                                    <span className={
                                        userData.name === item.name ? 'text-gray-300' :
                                            index < 3 ? 'text-purple-700' : 'text-gray-500'
                                    }>
                                        {item.name}
                                    </span>
                                </div>
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

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500); // 1.5 seconds delay

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <div className='pt-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto'>
            <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-purple text-center mb-8 tracking-tight'>STANDINGS</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-purple" />
                </div>
            ) : (
                <Table userData={userData} />
            )}
        </div>
    )
}

export default StandingsTable;

