import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

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

    return (
        <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50 to-sky-100 p-6">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('left')}
                >
                    {/* <ChevronLeft className="h-6 w-6 text-gray-600" /> */}
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex space-x-8 px-4">
                        <StatItem title="Price" value={`${players[selectedSlot] && players[selectedSlot].price}M $ `} subtext="9 of 315" />
                        <StatItem title="Avg Points" value="0" subtext="0 of 0" />
                        <StatItem title="Total Pts" value="0" />
                    </div>
                </div>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('right')}
                >
                    {/* <ChevronRight className="h-6 w-6 text-gray-600" /> */}
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

