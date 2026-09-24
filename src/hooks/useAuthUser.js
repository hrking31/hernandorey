import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Components/Firebase/Firebase";

// Usuario con sesión iniciada en Firebase Auth (null si no hay sesión).
export default function useAuthUser() {
  const [state, setState] = useState({ user: auth.currentUser, loading: true });

  useEffect(
    () => onAuthStateChanged(auth, (user) => setState({ user, loading: false })),
    []
  );

  return state;
}
