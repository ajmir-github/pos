import { ReactNode, useEffect } from "react";
import socket from "../socket";
import { useAuth } from "../state";
import { clearLocalToken, hasLocalToken } from "../utils/localToken";
import LoadingPage from "../components/LoadingPage";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const state = useAuth();

  const authenticate = () => {
    if (!hasLocalToken()) return state.reset();
    socket.emit("getAuth", (response) => {
      if (response.data) return state.init(response.data);
      if (response.error) {
        clearLocalToken();
        return state.setError(response.error.message);
      }
      // else
      console.error(response);
      return state.setError("IDK");
    });
  };

  useEffect(() => {
    authenticate();

    socket.on("auth", (auth) => state.setData(auth));

    return () => {
      socket.off("auth");
    };
  }, []);

  console.log(state);

  return state.data !== null ? (
    <LoadingPage message="Autheticating" />
  ) : (
    children
  );
}
