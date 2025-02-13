import React from 'react';
import SpectateView from './SpectateView';
import spectateUser from '@/utils/team/spectateUser';
const page = async ({ params }) => {
    const Params = await params;
    const spectatedUserUid = Params.uid;
    let players = {};
    if (spectatedUserUid) {
        players = await spectateUser(spectatedUserUid);
    }
    return (
        <>
            <SpectateView spectatedUserUid={spectatedUserUid} players={players} userData={{ clubName: 'chris', name: 'Ivo' }} />
        </>
    )
}

export default page;