import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StateProvider from "./Providers/StateProvider";

function App() {
  return (
    <div className="w-full h-dvh bg-black text-white bg-radial-[at_50%_75%] from-transparent  to-gray-500/30 shrink-0 border-r border-gray-500/50">
      <StateProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateLayout />}>
              <Route index element={<HomePage />} />
              <Route path="settings" element={<h1>settings</h1>} />
              <Route
                path="table/:tableNuber"
                element={<h1>table:tableNuber</h1>}
              />
            </Route>

            <Route path="login" element={<PublicLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StateProvider>
    </div>
  );
}

export default App;
