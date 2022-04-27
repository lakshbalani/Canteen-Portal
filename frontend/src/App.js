import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import VendorProf from "./components/common/VendorProf";
import FoodDash from "./components/common/FoodDash";
import Addfood from "./components/common/Addfood";
import FoodMenu from "./components/common/FoodMenu";
import VendorOrders from "./components/common/vendorOrders";
import BuyerOrders from "./components/common/buyerOrders";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="vendorProf" element={<VendorProf />} />
          <Route path="foodDash" element={<FoodDash />} />
          <Route path="addfood" element={<Addfood />} />
          <Route path="foodMenu" element={<FoodMenu />} />
          <Route path="vendorOrders" element={<VendorOrders />} />
          <Route path="buyerOrders" element={<BuyerOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
