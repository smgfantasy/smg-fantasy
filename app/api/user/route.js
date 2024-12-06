import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from "firebase-admin";
import { cookies } from "next/headers";
import getUserUid from "@/utils/auth/getUserUid";


customInitApp();
const db = admin.firestore();

export async function POST(request) {
    try {
        const { uid, name, clubName, email, creationDate } = await request.json();

        try {
            // Create or update user document in the 'users' collection
            const userDocRef = db.collection("users").doc(uid);
            await userDocRef.set({
                uid: uid,
                email: email,
                clubName: clubName,
                name: name,
                creationDate: creationDate,
            });

            // Create or update team document in the 'users-teams' collection
            const teamDocRef = db.collection("users-teams").doc(uid);

            const players = [
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
                { name: "", points: null, team: "", position: "" },
            ];

            // Fetch the current "team" array
            const docSnapshot = await teamDocRef.get();
            const existingTeam = docSnapshot.exists ? docSnapshot.data().team || [] : [];

            // Add all players (including duplicates) to the existing team
            const updatedTeam = [...existingTeam, ...players];

            // Compute statistics for the updated team
            const totalPoints = updatedTeam.reduce((sum, player) => sum + (player.points || 0), 0);
            const averagePoints = updatedTeam.length ? totalPoints / updatedTeam.length : 0;
            const highestPoints = updatedTeam.reduce(
                (max, player) => Math.max(max, player.points || 0),
                0
            );
            const finalPoints = totalPoints; // Assuming finalPoints = totalPoints

            // Update the team document with the new team array and statistics
            await teamDocRef.set(
                {
                    team: updatedTeam,
                    averagePoints: Math.round(averagePoints), // Rounded for simplicity
                    finalPoints,
                    highestPoints,
                },
                { merge: true }
            );

            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({}, { status: 400 });
    }
}


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
            const docRef = db.collection("users").doc(uid);
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
