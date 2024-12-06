import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from "firebase-admin";
import getUserUid from "@/utils/auth/getUserUid";
import { cookies } from "next/headers";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function GET(request) {
    try {
        const cookiesObject = await cookies();
        const session = cookiesObject.get("session")?.value || "";
        // Extract 'uid' from the request URL query
        const { uid, error } = await getUserUid(session);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        try {
            // Query the Firestore document by uid
            const docRef = db.collection("users-teams").doc(uid);
            const doc = await docRef.get();

            if (!doc.exists) {
                return NextResponse.json(
                    { error: `No document found for uid: ${uid}` },
                    { status: 404 }
                );
            }

            // Return the document data
            return NextResponse.json(doc.data(), { status: 200 });
        } catch (error) {
            console.error("Error retrieving document: ", error);
            return NextResponse.json(
                { error: "Error retrieving document" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error processing the request: ", error);
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}

export async function PUT(request) {
    try {
        const cookiesObject = await cookies();
        const session = cookiesObject.get("session")?.value || "";

        // Extract 'uid' from the session
        const { uid, error } = await getUserUid(session);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        // Parse the request body to extract players
        const body = await request.json();
        const players = body.players;

        if (!Array.isArray(players)) {
            return NextResponse.json({ error: "Invalid players data" }, { status: 400 });
        }

        try {
            const docRef = db.collection('users-teams').doc(uid);

            // Replace the team array with the new one
            await docRef.set({ team: players }, { merge: true });

            console.log('Team successfully updated!');
            return NextResponse.json({ message: "Team updated successfully" }, { status: 200 });
        } catch (error) {
            console.error('Error updating document: ', error);
            return NextResponse.json({ error: "Error updating document" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
}
