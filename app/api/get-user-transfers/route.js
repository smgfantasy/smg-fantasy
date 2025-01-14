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
            const docData = doc.data();
            let madeTransfers;
            if (docData.madeTransfers) {
                madeTransfers = docData.madeTransfers;
            } else {
                madeTransfers = 0;
            }
            return NextResponse.json({ madeTransfers }, { status: 200 });
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