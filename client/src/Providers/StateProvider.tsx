import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

export default function StateProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
