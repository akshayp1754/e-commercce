import React from "react";
import { Outlet } from "react-router";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
