import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const setUser = async (session) => {
  const q = query(collection(db, "users"));
  const userList = await getDocs(q).docs;
  if (
    !userList?.map((user) => user.data().email).includes(session.user.email)
  ) {
    await setDoc(doc(q, session.user.email), { ...session.user });
  }
};

export default setUser;
