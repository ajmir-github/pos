import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "./Providers/authProvider";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider loading="Loading">
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
    </AuthProvider>
  );
}

export default App;
