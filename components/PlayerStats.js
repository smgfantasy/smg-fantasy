import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

function PlayerStats() {
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
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex space-x-8 px-4">
                        <StatItem title="Price" value="£7.7m" subtext="9 of 315" />
                        <StatItem title="Form" value="3.0" />
                        <StatItem title="Pts / Match" value="5.9" subtext="4 of 315" />
                        <StatItem title="GW14 Pts" value="2" />
                        <StatItem title="Total Pts" value="78" />
                        <StatItem title="Total Bonus" value="12" />
                        <StatItem title="ICT Index" value="134.2" />
                        <StatItem title="TSB%" value="24.7%" />
                    </div>
                </div>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform z-10 bg-white bg-opacity-50 rounded-full p-1"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
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

