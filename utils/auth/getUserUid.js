import { NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";

customInitApp();

const getUserUid = async (session) => {
    // Validate if the cookie exists in the request
    if (!session || session === undefined) {
        return { error: NextResponse.json({ isLogged: false }, { status: 401 }) };
    }

    try {
        const decodedClaims = await auth().verifySessionCookie(session, true);;
        if (!decodedClaims) {
            return { error: NextResponse.json({ isLogged: false }, { status: 401 }) };
        }

        const uid = decodedClaims.uid;

        if (!uid) {
            return { error: NextResponse.json({ error: 'uid query parameter is required' }, { status: 400 }) };
        }


        return { uid };
    } catch (e) {
        console.error(e);
        return { error: NextResponse.json({ error: e.message }, { status: 400 }) };
    }
}

export default getUserUid;