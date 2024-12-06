import React from 'react'
import Team from '@/components/Team'
import PlayerInfoMenu from '@/components/PlayerInfoMenu'
import { cookies } from 'next/headers';
import { getUserData } from '@/utils/user/getUserData';

const page = async () => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    const userData = await getUserData(sessionCookie);
    return (
        <>
            <Team userData={userData} sessionCookie={sessionCookie} />
            <PlayerInfoMenu currVariant={"team"} />
        </>

    )
}

export default page;