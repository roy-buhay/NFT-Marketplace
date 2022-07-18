import { db, initFirebase } from "@firebase/initFirebase";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
} from "firebase/firestore";
import { IUser } from "types";

initFirebase();

export async function getUserData(address?: any){
  let userResult: IUser[] = []
  const userRef: CollectionReference = collection(db, "users");
  let userSnap: DocumentData;
  let snapShot: Query;

  try {
    if (address) {
        snapShot = query(userRef, where("address", "==", address));
        userSnap = await getDocs(snapShot);
        if (userSnap.empty) {
            const profile: IUser = {
                address: address,
                bio: "",
                email: "",
                name: 'Random Name',
            };
            setDoc(doc(db, "users", address), profile);
        }
        userSnap.forEach((user: { data: () => IUser; }) =>
          userResult.push(user.data())
        )
    } else {
      userSnap = await getDocs(userRef);
      userSnap.forEach((user: { data: () => IUser }) =>
        userResult.push(user.data())
      )
    }
    return userResult
  } catch (error) {
    return error
  }
}