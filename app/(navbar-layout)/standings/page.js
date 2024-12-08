'use client';
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const Table = () => {
    const data = [
        // { rank: 1, team: 'AlexFC', manager: 'Alexander Malinovsky', gw: 69, tot: 935 },
        // { rank: 2, team: 'Erty FC', manager: 'Nikolay Rogov', gw: 56, tot: 859 },
        // { rank: 3, team: 'SeksMashini', manager: 'Ники Вулджев', gw: 65, tot: 830 },
        // { rank: 4, team: 'BestSquad', manager: 'Hristo Mihaylov', gw: 39, tot: 811 },
        // { rank: 5, team: 'Qnchi FC', manager: 'Nikola Yanchev', gw: 48, tot: 798 },
        // { rank: 6, team: 'Pergisha FC', manager: 'Atanas Filipov', gw: 50, tot: 734, isUser: true, },
        // { rank: 7, team: 'chukundurite', manager: 'Nikola Lazarov', gw: 55, tot: 717 },
        // { rank: 8, team: 'Sauron', manager: 'Ivaylo Vasilev', gw: 44, tot: 712 },
        // { rank: 9, team: '1. FC Bankenstadt', manager: 'Martin Bogdanov', gw: 67, tot: 522 },
    ];

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
                <thead className="border-b border-gray-200">
                    {/* <tr className="text-xs text-gray-500">
                        <th className="whitespace-nowrap px-4 py-3 font-medium text-center">Rank</th>
                        <th className="whitespace-nowrap px-4 py-3 font-medium">Team & Manager</th>
                        <th className="whitespace-nowrap px-4 py-3 font-medium">GW</th>
                        <th className="whitespace-nowrap px-4 py-3 font-medium">TOT</th>
                    </tr> */}
                </thead>
                <tbody className='text-sm'>
                    {data.map((item) => (
                        <tr
                            key={item.rank}
                            className={`border-b border-gray-100 last:border-0 ${item.isUser ? 'bg-[#2D004D] text-white' : 'hover:bg-gray-50'
                                }`}
                        >
                            <td className="px-4 py-3 text-center">
                                <span>{item.rank}</span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-col">
                                    <span className={item.isUser ? 'text-[#4ADE80]' : 'text-[#2D004D] font-medium'}>
                                        {item.team}
                                    </span>
                                    <span className={item.isUser ? 'text-gray-300' : 'text-gray-500'}>
                                        {item.manager}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3">{item.gw}</td>
                            <td className="px-4 py-3">{item.tot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

const Page = () => {
    const [selectedPhase, setSelectedPhase] = useState('Phase 1');
    const [isLoading, setIsLoading] = useState(false);

    const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

    const handleSelectChange = (event) => {
        setIsLoading(true);
        setSelectedPhase(event.target.value);
    };

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
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <div className="flex items-center space-x-4">
                    <label htmlFor="phase-select" className="text-lg font-semibold text-gray-700">
                        Phase:
                    </label>
                    <select
                        id="phase-select"
                        value={selectedPhase}
                        onChange={handleSelectChange}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple text-gray-700"
                        disabled={isLoading}
                    >
                        {phases.map((phase, index) => (
                            <option key={index} value={phase}>
                                {phase}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <Link href="/matches" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#2D004D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple">
                    View Next Matches
                </Link> */}
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-purple" />
                </div>
            ) : (
                <Table />
            )}
            <div className='font-bold text-2xl mt-10 text-center'>Ranking will be available after the first match has finished</div>
        </div>
    )
}

export default Page;

