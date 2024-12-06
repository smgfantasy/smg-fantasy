import React from 'react'
import Team from '@/components/Team'
import PlayerInfoMenu from '@/components/PlayerInfoMenu'
import { cookies } from 'next/headers';

const page = async () => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    return (
        <>
            <Team sessionCookie={sessionCookie} />
            <PlayerInfoMenu currVariant={"team"} />
        </>

    )
}

export default page;