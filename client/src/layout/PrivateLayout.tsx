import { Navigate, Outlet } from "react-router";
import { useAuth } from "../state";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  const auth = useAuth((state) => state.data);

  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="w-full h-dvh flex overflow-hidden bg-black text-white bg-radial-[at_50%_75%] from-transparent  to-gray-500/30 shrink-0 border-r border-gray-500/50">
      <div className="overflow-y-auto overflow-x-hidden min-h-full p-2 sm:p-4 border-r border-gray-500">
        <Sidebar />
      </div>
      <div className="grow overflow-y-auto overflow-x-hidden min-h-full p-2 sm:p-4 ">
        <Outlet />
      </div>
    </div>
  );
}
