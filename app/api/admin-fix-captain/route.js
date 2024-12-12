import admin from "firebase-admin";
import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function POST() {
    try {
        const usersTeamsCollection = db.collection("users-teams");
        const snapshot = await usersTeamsCollection.get();

        if (snapshot.empty) {
            return NextResponse.json({ message: "No documents found in the 'users-teams' collection." });
        }

        const updates = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            const teams = data.team || []; // Default to an empty array if `teams` is missing

            // Check if there's already a captain
            const hasCaptain = teams.some(player => player.captain);

            if (!hasCaptain) {
                // Look for specific players or assign the first "fwd" as captain
                let updated = false;
                let changedPlayerName;
                for (let player of teams) {
                    if (player.name === "Никола Тодоров") {
                        player.captain = true;
                        changedPlayerName = player.name;
                        updated = true;
                        break;
                    }
                }

                if (!updated) {
                    for (let player of teams) {
                        if (player.name === "Александър Малиновски") {
                            player.captain = true;
                            changedPlayerName = player.name;
                            updated = true;
                            break;
                        }
                    }
                }

                if (!updated) {
                    for (let player of teams) {
                        if (player.position === "fwd") {
                            player.captain = true;
                            changedPlayerName = player.name;
                            updated = true;
                            break;
                        }
                    }
                }

                // If an update occurred, add it to the batch
                if (updated) {
                    updates.push({
                        documentId: doc.id,
                        updatedTeams: teams,
                    });
                    console.log(`${doc.id} updated captain to ${changedPlayerName} `);
                }
            }
        });

        // Write changes to Firestore
        const batch = db.batch();
        updates.forEach(({ documentId, updatedTeams }) => {
            const docRef = usersTeamsCollection.doc(documentId);
            batch.update(docRef, { teams: updatedTeams });
        });

        if (updates.length > 0) {
            await batch.commit();
        }

        return NextResponse.json({
            message: `${updates.length} document(s) updated.`,
            updates,
        });
    } catch (error) {
        console.error("Error fetching or updating documents:", error);
        return NextResponse.json({ error: "Failed to process documents in 'users-teams' collection." }, { status: 500 });
    }
}
