import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";


// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request, response) {
    const headersValue = await headers();
    const authorization = headersValue.get("Authorization");
    let clientCookie;
    if (authorization?.startsWith("Bearer ")) {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await auth().verifyIdToken(idToken);

        if (decodedToken) {
            //Generate session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await auth().createSessionCookie(idToken, {
                expiresIn,
            });
            clientCookie = sessionCookie;
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            //Add the cookie to the browser
            const cookiesValue = await cookies();
            cookiesValue.set(options);
            return NextResponse.json({ sessionCookie }, { status: 200 });
        }
    }

}


export async function GET(request) {

    const cookiesValue = await cookies();
    const session = cookiesValue.get("session")?.value || "";

    //Validate if the cookie exist in the request
    if (!session || session === undefined) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }
    //Use Firebase Admin to validate the session cookie
    try {

        const decodedClaims = await auth().verifySessionCookie(session, true);

        if (!decodedClaims) {
            return NextResponse.json({ isLogged: false }, { status: 401 });
        }

        return NextResponse.json({ isLogged: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ isLogged: false }, { status: 401 });
    }

}