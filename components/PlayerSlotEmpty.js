import React from 'react';
import { UserPlus } from 'lucide-react';
import getPlayerPosition from '@/functions/getPlayerPosition';
import { useAppContext } from '@/context/AppContext';
const PlayerSlotEmpty = ({ position }) => {
    const { benchPos } = useAppContext();
    return (
        <div className="w-[60px] h-[82px] bg-[#0e9d5e] rounded-md flex flex-col items-center justify-center text-white">
            <div className="w-6 h-6">
                <UserPlus />
            </div>
            <div className="mt-1 text-sm font-medium">
                {getPlayerPosition(position, benchPos)}
            </div>
        </div>
    )
}

export default PlayerSlotEmpty;