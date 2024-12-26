import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import playersPoints from '../data/round1Points.json';

const PlayerStats = () => {

    const { selectedSlot, players } = useAppContext();

    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const [currPlayerPoints, setCurrPlayerPoints] = useState(0);
    let current = 0;
    useEffect(() => {
        try {

            if (Array.isArray(players) && players.length !== 0) {
                const selectedPlayer = players[selectedSlot];
                if (selectedPlayer && selectedPlayer.name) {
                    const foundPlayer = playersPoints.find(player => player.name === selectedPlayer.name);
                    const foundPlayerFromArr = players.find(playerFromArr => playerFromArr.name === selectedPlayer.name);

                    if (foundPlayer) {
                        current = foundPlayer.points || 0;
                        if (foundPlayerFromArr?.captain) {
                            current *= 2;
                        }
                    }
                    setCurrPlayerPoints(current);
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }, [players, selectedSlot, playersPoints]);


    return (
        <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50 to-sky-100 p-6">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('left')}
                >
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex space-x-8 px-4">
                        <StatItem title="Price" value={`${players[selectedSlot] && players[selectedSlot].price}M $ `} subtext="" />
                        <StatItem title="Avg Points" value={currPlayerPoints} subtext="" />
                        <StatItem title="Total Pts" value={currPlayerPoints} />
                    </div>
                </div>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('right')}
                >
                </button>
            </div>
        </div>
    )
}

function StatItem({ title, value, subtext }) {
    return (
        <div className="text-center flex-shrink-0">
            <div className="text-sm font-medium text-gray-600">{title}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
        </div>
    )
}

export default PlayerStats

