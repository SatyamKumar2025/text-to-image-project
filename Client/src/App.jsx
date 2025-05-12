import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import BuyCredit from "./Pages/BuyCredit";
import Result from "./Pages/Result";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import { AppContext } from "./Context/AppContext";
import PaymentCard from "./Pages/PaymentSent";
import { loadTheme } from "./Utills/theme";

const App = () => {
  useEffect(() => {
    loadTheme();
  }, []);
  const { showLogin } = useContext(AppContext);
  return (
    <div className=" px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen transition-all duration-300 bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white">
      <ToastContainer position="bottom-right" />
      <NavBar />

      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/pay" element={<PaymentCard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
