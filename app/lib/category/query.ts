import { db, initFirebase } from "@firebase/initFirebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";

initFirebase();

export async function getCategoryData(queryString?: any){
  let categoryResult: string[] = []
  let categorySnap: DocumentData;
  let snapShot: Query;
  const categoryRef: CollectionReference = collection(db, "categories");

  try {
    if (queryString) {
      snapShot = query(categoryRef, where("name", "==", queryString));
      categorySnap = await getDocs(snapShot);
    } else {
      categorySnap = await getDocs(categoryRef);
    }
    categorySnap.forEach((category) =>
        categoryResult.push(category.data().name)
    )
    return categoryResult
  } catch (error) {
    return error
  }
}