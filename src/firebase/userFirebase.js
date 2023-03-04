import {
  doc,
  getDoc,
  query,
  collection,
  orderBy,
  where,
  limit,
  getDocs,
} from "firebase/firestore"
import { db } from "."

export const fetchUserData = async (collectionName, userId) => {
  const docRef = doc(db, collectionName, userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return null
}

export const fetchUserOrderData = async (collectionName) => {
  let q1 = query(
    collection(db, collectionName),
    where("paymentStatus", "==", "completed"),
    orderBy("timeStamp", "desc"),
    limit(10)
  )
  const snapshot = await getDocs(q1)
  const items = []
  if (snapshot.empty) {
    return
  }
  snapshot.forEach((item) => items.push({ ...item.data() }))
  return items
}
