import { ReactNode, useEffect } from "react";
import socket from "../socket";
import { useAppDispatch, tabActions } from "../state";
import LoadingPage from "../components/LoadingPage";

export default function TabProvider({ children }: { children: ReactNode }) {
  // const tabs = useAppSelector((state) => state.tab);\
  const dispatch = useAppDispatch();

  const getTabs = () => {
    socket.emit("getTabs", (response) => {
      if (response.success) return dispatch(tabActions.loadTabs(response.data));
      // else
      dispatch(tabActions.clearTabs());
      console.error(response);
    });
  };

  useEffect(() => {
    getTabs();
  }, []);

  if (status === "loading") return <LoadingPage message="Loading Tables" />;
  if (status === "error") return <LoadingPage message="error!" />;
  return children;
}
