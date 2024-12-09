import admin from "firebase-admin";
import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";

// Initialize Firebase Admin
customInitApp();
const db = admin.firestore();

export async function GET() {
    try {
        // Reference to the 'users' collection
        const usersCollection = db.collection("users");

        // Fetch all documents in the 'users' collection
        const snapshot = await usersCollection.get();

        if (snapshot.empty) {
            return NextResponse.json({ message: "No documents found in the 'users' collection." });
        }

        // Process and return only specified properties
        const usersData = [];
        snapshot.forEach((doc) => {
            const { uid, name, clubName } = doc.data(); // Destructure specific fields
            usersData.push({
                uid: uid || null, // Default to null if the property is missing
                name: name || null,
                clubName: clubName || null,
            });
        });

        return NextResponse.json({ users: usersData });
    } catch (error) {
        console.error("Error fetching documents from 'users' collection:", error);
        return NextResponse.json({ error: "Failed to fetch documents from 'users' collection." }, { status: 500 });
    }
}
