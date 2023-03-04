import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  limit,
  getDocs,
} from "firebase/firestore"
import { db, storage } from "./index"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export const addProductFirebase = async (
  collectionName,
  currentUser,
  values
) => {
  try {
    if (!currentUser) Promise.reject()
    const docRef = await addDoc(collection(db, collectionName), values)
    return Promise.resolve(docRef.id)
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export const addProductImage = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, new Date().getTime() + "_" + file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log("Upload is " + progress + "% done")
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused")
              break
            case "running":
              // console.log("Upload is running")
              break
            default:
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            resolve(downloadURL)
          })
        }
      )
    } catch (e) {
      console.log("error: ", e)
    }
  })
}

export const getPaginateProducts = async (
  collectionName,
  orderName,
  order = "desc"
) => {
  const q1 = query(
    collection(db, collectionName),
    orderBy(orderName, order),
    limit(60)
  )
  const querySnapshot = await getDocs(q1)
  const items = []
  querySnapshot.forEach((item) => items.push({ ...item.data(), id: item.id }))
  return items
}

export const getProductsEqualFilter = async (
  collectionName,
  filters,
  order,
  orderOrder = "desc"
) => {
  // var query =  Firestore.instance
  //     .collection('Foods')
  //     .orderBy('create at', descending: true);
  // console.log(filterName, filterValues);
  let q1 = query(
    collection(db, collectionName),
    orderBy(order, orderOrder),
    limit(60)
  )
  filters.forEach((filter) => {
    q1 = query(
      q1,
      where(filter.filterName, filter.operator, filter.filterValues)
    )
  })
  // console.log(q1);
  // q1 = q1.where(filterName, "==", filterValues);
  // let q1 = query(
  //   collection(db, collectionName),

  // );
  // q1 = q1.where(filterName, "==", filterValues);
  const querySnapshot = await getDocs(q1)
  const items = []
  querySnapshot.forEach((item) => items.push({ ...item.data(), id: item.id }))
  return items
}

export const getProductDetails = async (collectionName) => {
  try {
    const q1 = query(collection(db, collectionName), limit(10))
    const querySnapshot = await getDocs(q1)
    if (querySnapshot.empty) return
    return querySnapshot.docs[0].data()
  } catch (error) {
    console.error(error)
  }
}

export const getHomepageProduct = async (collectionName) => {
  const q1 = query(
    collection(db, collectionName),
    limit(3),
    orderBy("timeStamp", "desc")
  )
  const querySnapshot = await getDocs(q1)
  const items = []
  querySnapshot.forEach((item) => items.push({ ...item.data(), id: item.id }))
  return items
}
