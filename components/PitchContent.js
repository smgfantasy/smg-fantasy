import React from 'react';
import PlayerSlot from './PlayerSlot';

const PitchContent = ({ players }) => {
    return (
        (players.length > 0 &&
            <div className="mt-10 w-full min-h-[600px] flex flex-col items-center gap-5" style={{ background: 'url(https://pitch.free.bg/pitch.svg) center top / 625px 460px no-repeat' }}>
                <PlayerSlot position={0} name={players[0].name} points={players[0].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />
                {[...Array(3)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-around w-full">
                        {[...Array(3)].map((_, colIndex) => {
                            const position = rowIndex * 3 + colIndex + 1;
                            return <PlayerSlot key={position} position={position} name={players[position].name} points={players[position].points} img="https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-110.webp" />;
                        })}
                    </div>
                ))}
            </div>
        )
    )
}

export default PitchContent;