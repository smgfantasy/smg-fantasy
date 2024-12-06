import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from 'firebase-admin';

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
            const docRef = db.collection('users-teams').doc(documentUID);

            // Fetch the current "team" array
            const docSnapshot = await docRef.get();
            const existingTeam = docSnapshot.exists ? docSnapshot.data().team || [] : [];

            // Add all players (including duplicates) to the existing team
            const updatedTeam = [...existingTeam, ...players];

            // Update the document with the new team array
            await docRef.set({ team: updatedTeam }, { merge: true });

            console.log('Players successfully added to the team!');
            return NextResponse.json({ message: "Players added successfully" }, { status: 200 });
        } catch (error) {
            console.error('Error updating document: ', error);
            return NextResponse.json({ error: "Error updating document" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
}
