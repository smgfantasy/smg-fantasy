import admin from "firebase-admin";
import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function GET() {
    try {
        const usersTeamsCollection = db.collection("users-teams");
        const snapshot = await usersTeamsCollection.get();

        if (snapshot.empty) {
            return NextResponse.json({ message: "No documents found in the 'users-teams' collection." });
        }

        const teamsData = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            teamsData.push({
                documentId: doc.id,
                teams: data.team || [], // Include an empty array if `teams` is missing
            });
        });

        // Check constraints for each team's array
        teamsData.forEach(({ documentId, teams }) => {
            const counts = {
                def: 0,
                mid: 0,
                fwd: 0,
            };

            // Count the positions
            teams.forEach((player) => {
                if (player.position in counts) {
                    counts[player.position]++;
                }
            });

            // Log documentId if constraints are violated
            if (counts.def > 3 || counts.mid > 3 || counts.fwd > 2) {
                console.log(`Document ID: ${documentId} has an invalid team configuration:`, counts);
            }
        });

        return NextResponse.json({ teams: teamsData });
    } catch (error) {
        console.error("Error fetching documents:", error);
        return NextResponse.json({ error: "Failed to fetch documents from 'users-teams' collection." }, { status: 500 });
    }
}
