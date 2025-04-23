import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import TabProvider from "./TabProvider";

export default function StateProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TabProvider>{children}</TabProvider>
    </AuthProvider>
  );
}
