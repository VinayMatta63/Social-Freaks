import { db } from "../firebase";

const setUser = async (session) => {
  if (
    !(await db.collection("users").get()).docs
      .map((user) => user.data().email)
      .includes(session.user.email)
  ) {
    await db
      .collection("users")
      .doc(session.user.email)
      .set({ ...session.user });
  }
};

export default setUser;
