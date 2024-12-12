import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
    credential: cert({
        project_id: "smg-fantasy",
        client_email: "firebase-adminsdk-8nkcw@smg-fantasy.iam.gserviceaccount.com",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9V3YolVBLUeii\nAXlzV7Od6T30XnVc77qhtcz2PmM5bg9fL/X6rwHEK+KaKVIve+ZtQ6h1Eyp+fF5L\nD3pYeQnKM4DCVIEAgA9XBOQdkwhROi6Xf0t3gmg3MFMFDUHf54ltseyDrxa1xBkx\nuAmL/egx8uqNBmKIRQVNdJajqHM0Pz/WlWSRj0M0YqCWQdKALQLdSftyP76mu1Pi\n3vtLc0C++E+nQ8FR9U+5M7UQpE51D+UCcuBi8MuCoHbzGaY9Al9dG6CS225RQz8Q\nlhlVDd2Pf1nk+YpH6VP1X2ZiRhW38tbJR0fsYo2f13qshHDNDGqjkvgICz2nszx8\nNfx6DQqNAgMBAAECggEAOzaQgcWcXEnL3mpmoH9DcXWBhhxKSNvB+pOf+zxsjIfS\nb9rQaurzOvXcgoi8ppPxbqdTlfV9+xuK459+DBAiUyWDNYL26wChi33Al00lsz1m\nV8OcBs52KBhJRlGskcjXrkIP7OjDSen/VRCwj6LCzGgjGSJvix1GuL/m4lyqVqKL\n8RlXcdmvl43TRAIbIJ0haxu13x16Bw9oAih8Qttuw5rBRypd8mdccIUHJZx2GMh6\n7v9z59WyFhGgjXIjuyb1ZpH81l1nk0jUBq7yFB/7CTk7jXYaQEdOM9JEZlJwC6KJ\nqKs+M1wwIxEZKYhUi9e5G1z9nhyV3Lju6QZHQO/IUwKBgQD/Gkn8Pijdtf9aKENK\nrO2XBBNCmu608AJqPN2LO/sdUzq1aeKFVB1rcFbd6ofONXI3Y9ArOl6cYkiTatOw\nZKTdwxly7j2wki1nB/VJu18nPrgs9jRXPwLRULt2fYZNJg2HBghy3kOfX6eVcRC7\nSsr5PLby652yqGc6PDkUfhubowKBgQC+AfUA7TgtCI8rTWIPTrHgxP8G5Y0qaEUf\n3OU4/D5xaU+cufPVoM9U2DxdtTIINhdG92UTAkR7O/N1AKefKDo53jbruELCw+hr\nCoIjGuCw6sVHnceYSnZtOGKb1/LItm+Q1fnq0yxO3kCEepRNV3wRZ5Uq5mD3Hini\nCZByggQkDwKBgQCI5TGo1C6X88+pMQwTacNCFCTFzGCm5llVa34z9qcmMIDD06OE\niwQSoMFs6yufpBy7zqtqVzNoVnG98kjRUuEKRGVGwMSIGZmVvbaKr6s7YzPwpNqn\nqx+29czzpB7LDc2alMk54z6Eqw9Cad9hspxDrao7p+cDdc2XebPj5FyqYwKBgQCK\nQZRMC1CP/CVpBdKvfryR5+YF16xjSiHaMHqef3TUQyPJz8jsDiou+3TZXso8DVfc\nrJFgRosb/KCG52YQuk2748SkupvhannIwYm2D42lTf8kwFsGplAL4zZlXbnscEs3\n4WsLgoNAFBpwC12z9U9yvqNc5utxhQJG1lzD5XUr4wKBgHbuxBehfDy36TCO3spT\nuCfBh5Wi4wXsKeqct6uq1dUcEjRtL3gMof2uTuQqfGx24byEWkawOX2BPye+8cE8\n4LP8UT+zZEm1Z2tx60HbJHGhc7s/ui/2rp68Bb9nebf7KITlLfzLj2Zr79k3V0xj\nOaBsMRJQ0JhC3klYPx/7nhki\n-----END PRIVATE KEY-----\n",
    }),
}
export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}