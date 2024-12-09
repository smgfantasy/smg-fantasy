import React from 'react';
import StandingsTable from './StandingsTable';
import { cookies } from 'next/headers';
import { getUserData } from '@/utils/user/getUserData';


const page = async () => {

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    const userData = await getUserData(sessionCookie);


    return (
        <StandingsTable userData={userData}></StandingsTable >
    )
}

export default page;