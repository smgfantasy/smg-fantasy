import { NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import admin from 'firebase-admin';
customInitApp();
const db = admin.firestore();


export async function POST(request) {
    try {
        const { uid, name, clubName, email, creationDate } = await request.json();

        try {
            const docRef = db.collection('users').doc(uid);
            await docRef.set({
                uid: uid,
                email: email,
                clubName: clubName,
                name: name,
                creationDate: creationDate
            });
            console.log('Document successfully written!');
        } catch (error) {
            console.error('Error writing document: ', error);
        }

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({}, { status: 400 });
    }
}