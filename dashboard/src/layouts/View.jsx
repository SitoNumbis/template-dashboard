import { useState, useEffect, Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// contexts
import { useUser } from "../contexts/UserProvider";

// components
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function View() {
  const navigate = useNavigate();

  const { userState } = useUser();

  useEffect(() => {
    if (!userState.user) navigate("/auth/");
  }, [userState]);

  return (
    <Fragment>
      <Navbar />
      <div className="main">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
}

export default View;
