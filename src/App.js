import { Routes, Route } from "react-router-dom";
import { AdminProfile } from "./pages/adminProfile/adminProfile";
import { ControlGuards } from "./pages/controlGuards/controlGuards";
import { CreateClientScreen } from "./pages/clients/createClients/createClientScreen";
import { ThemeProvider } from "./components/themeProvider/themeProvider";
import { AdminLogin } from "./pages/login/adminLogin";
import { SidebarProvider } from './components/sidebar/sidebarContext';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Routes>
         <Route path="/" element={<AdminLogin />} />
         <Route path="/profile" element={<AdminProfile />} />
         <Route path="/profile/control-guards" element={<ControlGuards />} />
         <Route path="/profile/create-clients" element={<CreateClientScreen />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
