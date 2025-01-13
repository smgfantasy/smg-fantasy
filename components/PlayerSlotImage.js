import React from 'react'

const PlayerSlotImage = ({ playerTeam }) => {
    return (
        <img className='rounded-t-md' src={
            playerTeam === '11А'
                ? '/img/A.svg'
                : playerTeam === '11Б'
                    ? '/img/B.svg'
                    : playerTeam === '11В'
                        ? '/img/V.svg'
                        : playerTeam === '11Г'
                            ? '/img/G.svg'
                            : playerTeam === '11Е'
                                ? '/img/E.svg'
                                : playerTeam === '10'
                                    ? '/img/10.svg'
                                    : '' // Default fallback image
        } />
    )
}

export default PlayerSlotImage;