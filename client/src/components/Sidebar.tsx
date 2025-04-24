import {
  ChartBarIcon,
  HandCoinsIcon,
  LogOutIcon,
  LogsIcon,
  MartiniIcon,
  SettingsIcon,
  TableIcon,
  UtensilsIcon,
} from "lucide-react";
import { Link } from "react-router";
import { authActions, useAppDispatch } from "../state";
import { clearLocalToken } from "../utils/localToken";
import socket from "../socket";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const handleLogOut = () =>
    socket.emit("signOut", () => {
      clearLocalToken();
      dispatch(authActions.clearAuth());
    });
  return (
    <div className="flex flex-col justify-between h-full text-xs md:text-base gap-2">
      <div className="flex flex-col items-stretch gap-2">
        <Link
          to={"/"}
          className="font-semibold flex flex-col items-center bg-blue-500/60 hover:bg-blue-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <TableIcon />
          Tables
        </Link>
        <Link
          to={"/orders"}
          className="font-semibold flex flex-col items-center bg-yellow-500/60 hover:bg-yellow-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <LogsIcon />
          Orders
        </Link>
        <Link
          to={"/payments"}
          className="font-semibold flex flex-col items-center bg-gray-500/60 hover:bg-gray-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <HandCoinsIcon />
          Payments
        </Link>
        <Link
          to={"/bar"}
          className="font-semibold flex flex-col items-center bg-red-500/60 hover:bg-red-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <MartiniIcon />
          Bar
        </Link>
        <Link
          to={"/kitchen"}
          className="font-semibold flex flex-col items-center bg-purple-500/60 hover:bg-purple-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <UtensilsIcon />
          Kitchen
        </Link>
        <Link
          to={"/reports"}
          className="font-semibold flex flex-col items-center bg-orange-500/60 hover:bg-orange-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <ChartBarIcon />
          Reports
        </Link>
      </div>
      <div className="flex flex-col items-stretch gap-2">
        <Link
          to={"/settings"}
          className="font-semibold flex flex-col items-center bg-green-500/60 hover:bg-green-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <SettingsIcon />
          Settings
        </Link>
        <button
          onClick={handleLogOut}
          className="font-semibold flex flex-col items-center bg-pink-500/60 hover:bg-pink-500 cursor-pointer transition-colors duration-200 p-2 rounded-sm"
        >
          <LogOutIcon />
          Logout
        </button>
      </div>
    </div>
  );
}
