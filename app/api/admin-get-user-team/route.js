import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from "firebase-admin";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function GET(request) {
    try {
        // Extract 'uid' from the request URL query
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json({ error: "Missing uid parameter" }, { status: 400 });
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
