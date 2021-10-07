import React, { useState, useEffect } from "react";
import firebaseConfig from "../firebase/config/config";

export default function Realtime() {
  const [users, setUsers] = useState();

  useEffect(() => {
    firebaseConfig
      .firestore()
      .collection("user")
      .onSnapshot((ss) => setUsers(ss.docs.map((doc) => doc.data())));
  }, []);
  return (
    <div>
      <div>
        {users?.map(({ email, fullname, work }) => (
          <div key={email}>{(email, fullname, work)}</div>
        ))}
      </div>
    </div>
  );
}
