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
import { ICollection } from "types";

initFirebase();

export async function getCollectionData(queryString?: any){
  let collectionResult: ICollection[] = []
  const collectionsRef: CollectionReference = collection(db, "collections");
  let collectionsSnap: DocumentData;
  let snapShot: Query;

  try {
    if (queryString) {
      snapShot = query(collectionsRef, where("name", "==", queryString));
      collectionsSnap = await getDocs(snapShot);
    } else {
      collectionsSnap = await getDocs(collectionsRef);
    }
    collectionsSnap.forEach((collection: { data: () => ICollection }) =>
      collectionResult.push(collection.data())
    )
    return collectionResult
  } catch (error) {
    return error
  }
}