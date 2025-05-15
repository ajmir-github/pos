import { Navigate, Outlet } from "react-router";
import { useAuth } from "../state";

export default function PublicLayout() {
  const auth = useAuth((state) => state.data);

  if (auth) return <Navigate to={"/"} />;

  return (
    <div className="w-full h-dvh flex justify-center items-center flex-col gap-4  bg-black text-white bg-radial-[at_50%_75%] from-transparent  to-gray-500/30 shrink-0 border-r border-gray-500/50">
      <div className="font-serif">
        <h1 className="text-4xl font-bold text-orange-500">RestPOS</h1>
        <h4>Developed By Ajmir Raziqi</h4>
      </div>
      <Outlet />
    </div>
  );
}
