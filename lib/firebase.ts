import { cert, getApps, initializeApp, App, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey,
} as ServiceAccount;

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.projectId,
  });
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);