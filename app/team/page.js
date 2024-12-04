import React from 'react'
import Team from '@/components/Team'
import PlayerInfoMenu from '@/components/PlayerInfoMenu'

const page = () => {
    return (
        <>
            <Team />
            <PlayerInfoMenu currVariant={"team"} />
        </>

    )
}

export default page;