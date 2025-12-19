import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function getPhotography() {
  const q = query(
    collection(db, "photography"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
