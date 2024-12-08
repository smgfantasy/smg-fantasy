import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from "firebase-admin";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function POST(request) {
    try {
        const { documentUID, players } = await request.json();

        if (!documentUID || !players || !Array.isArray(players)) {
            throw new Error("Invalid input: documentUID and players array are required.");
        }

        try {
            const docRef = db.collection("users-teams").doc(documentUID);

            // Fetch the current document
            const docSnapshot = await docRef.get();
            const existingData = docSnapshot.exists ? docSnapshot.data() : {};

            // Retrieve existing team or initialize as an empty array
            const existingTeam = existingData.team || [];
            const updatedTeam = [...existingTeam, ...players];

            // Compute statistics for the updated team
            const totalPoints = updatedTeam.reduce((sum, player) => sum + (player.points || 0), 0);
            const averagePoints = updatedTeam.length ? totalPoints / updatedTeam.length : 0;
            const highestPoints = updatedTeam.reduce(
                (max, player) => Math.max(max, player.points || 0),
                0
            );
            const finalPoints = totalPoints; // Assuming finalPoints = totalPoints

            // Update the document with the new team array and statistics
            await docRef.set(
                {
                    team: updatedTeam,
                    averagePoints: Math.round(averagePoints), // Rounded for simplicity
                    finalPoints,
                    highestPoints,
                },
                { merge: true }
            );

            console.log("Players and stats successfully updated!");
            return NextResponse.json({ message: "Players and stats updated successfully" }, { status: 200 });
        } catch (error) {
            console.error("Error updating document: ", error);
            return NextResponse.json({ error: "Error updating document" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
}
