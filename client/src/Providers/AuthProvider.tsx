import { ReactNode, useEffect, useState } from "react";
import socket from "../socket";
import { useAppDispatch, authActions } from "../state";
import { clearLocalToken, hasLocalToken } from "../utils/localToken";
import LoadingPage from "../components/LoadingPage";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const authenticate = () => {
    if (!hasLocalToken()) return setLoading(false);
    socket.emit("getAuth", (response) => {
      if (response.data) {
        dispatch(authActions.setAuth(response.data));
        return setLoading(false);
      }
      if (response.error) {
        clearLocalToken();
        return setLoading(false);
      }
      // else
      console.error(response);
      return setLoading(false);
    });
  };

  useEffect(() => {
    authenticate();

    socket.on("auth", (auth) =>
      dispatch(auth ? authActions.setAuth(auth) : authActions.clearAuth())
    );

    return () => {
      socket.off("auth");
    };
  }, []);

  return isLoading ? <LoadingPage message="Autheticating" /> : children;
}
