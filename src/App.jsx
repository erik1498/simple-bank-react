import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import AuditorDashboard from "./pages/AuditorDashboard";
import Deposit from "./pages/Deposit";
import { AuditorRoute, CustomerRoute } from "./services/Guard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<CustomerRoute element={<Profile />} />} />
        <Route path="/update-profile" element={<CustomerRoute element={<UpdateProfile />} />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/transactions" element={<CustomerRoute element={<Transactions />} />} />
        <Route path="/transfer" element={<CustomerRoute element={<Transfer />} />} />

        <Route path="/auditor-dashboard" element={<AuditorRoute element={<AuditorDashboard />} />} />
        <Route path="/deposit" element={<AuditorRoute element={<Deposit />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
