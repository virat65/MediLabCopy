import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const token = sessionStorage.getItem("userInfo");
  const userToken = token ? JSON.parse(token) : null;
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    sessionStorage.clear("userInfo");
    navigate("/Login");
    toast.success("Logout Successfully");
  };

  return (
    <header id="header" className="header sticky-top">
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a href="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">Medilab</h1>
            {userToken && (
              <h5 className="fs-4 mt-2 ms-5 text-primary">
                Welcome <u>{userToken?.name}</u>
              </h5>
            )}
          </a>

          {/* NAV MENU */}
          <nav id="navmenu" className="navmenu">
            <ul className={showMenu ? "menu-open" : ""}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/department">Departments</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>

              {userToken?.role === "doctor" && (
                <li>
                  <Link to="/requested-appointments">Appointments</Link>
                </li>
              )}

              {userToken?.role === "user" && (
                <li>
                  <Link to="/my-appointments">My Appointments</Link>
                </li>
              )}

              <li>
                <Link to="/contact">Contact</Link>
              </li>

              {userToken?.role === "admin" && (
                <li>
                  <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
              )}

              <li>
                {/* Buttons */}
                {userToken?.role === "user" && (
                  <Link
                    className="cta-btn d-none d-sm-block"
                    to={"/appointment"}
                  >
                    Make an Appointment
                  </Link>
                )}

                {userToken ? (
                  <button
                    className="btn btn-danger ms-5 logout-btn"
                    onClick={logoutHandler}
                  >
                    <Link>Logout</Link>
                  </button>
                ) : (
                  <Link
                    className="cta-btn d-none d-sm-block login-btn"
                    to={"/login"}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>

            {/* Toggle Icon */}
            <i
              className={`mobile-nav-toggle d-xl-none bi ${
                showMenu ? "bi-x" : "bi-list"
              }`}
              onClick={() => setShowMenu(!showMenu)}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
