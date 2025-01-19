import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const totalGameweeks = 2;  // Set the total number of gameweeks

const loadGameweekData = async (week) => {
    try {
        const data = await import(`../data/gameweek${week}/roundPoints.json`);
        return data.default;
    } catch (error) {
        console.error(`Failed to load data for gameweek ${week}:`, error);
        return [];
    }
};

const PlayerStats = () => {
    const { selectedSlot, players } = useAppContext();
    const scrollContainerRef = useRef(null);

    const [playersPoints, setPlayersPoints] = useState([]);
    const [totalPlayerPoints, setTotalPlayerPoints] = useState(0);
    const [avgPlayerPoints, setAvgPlayerPoints] = useState(0);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const loadAllGameweeks = async () => {
            const allGameweeksData = await Promise.all(
                Array.from({ length: totalGameweeks }, (_, i) => loadGameweekData(i + 1))
            );
            setPlayersPoints(allGameweeksData);
        };

        loadAllGameweeks();
    }, []);

    useEffect(() => {
        if (Array.isArray(players) && players.length !== 0 && playersPoints.length !== 0) {
            const selectedPlayer = players[selectedSlot];
            if (selectedPlayer && selectedPlayer.name) {
                let totalPoints = 0;

                playersPoints.forEach((gameweekData) => {
                    const foundPlayer = gameweekData.find((player) => player.name === selectedPlayer.name);
                    const isCaptain = players.find((p) => p.name === selectedPlayer.name)?.captain;

                    if (foundPlayer) {
                        let points = foundPlayer.points || 0;
                        if (isCaptain) points *= 2;
                        totalPoints += points;
                    }
                });

                const averagePoints = totalPoints / playersPoints.length;
                setTotalPlayerPoints(totalPoints);
                setAvgPlayerPoints(averagePoints.toFixed(2)); // Rounded to 2 decimal places
            }
        }
    }, [players, selectedSlot, playersPoints]);

    return (
        <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50 to-sky-100 p-6">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft />
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex space-x-8 px-4">
                        <StatItem
                            title="Price"
                            value={`${players[selectedSlot] && players[selectedSlot].price}M $`}
                            subtext=""
                        />
                        <StatItem title="Avg Points" value={avgPlayerPoints} subtext="Across all gameweeks" />
                        <StatItem title="Total Pts" value={totalPlayerPoints} subtext="Sum of all points" />
                    </div>
                </div>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

function StatItem({ title, value, subtext }) {
    return (
        <div className="text-center flex-shrink-0">
            <div className="text-sm font-medium text-gray-600">{title}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
        </div>
    );
}

export default PlayerStats;
