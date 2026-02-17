import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const token = sessionStorage.getItem("userInfo");
  const userToken = token ? JSON.parse(token) : null;
  const navigate = useNavigate();

  const logoutHandler = () => {
    sessionStorage.clear("userInfo");
    navigate("/Login");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <header id="header" className="header sticky-top">
        <div className="topbar d-flex align-items-center">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center">
                <a href="mailto:contact@example.com">contact@example.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>+1 5589 55488 55</span>
              </i>
            </div>
            <div className="social-links d-none d-md-flex align-items-center">
              <a href="#" className="twitter">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="#" className="facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" className="instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="linkedin">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>
        {/* End Top Bar */}
        <div className="branding d-flex align-items-center">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <a
              href="index.html"
              className="logo d-flex align-items-center me-auto"
            >
              {/* Uncomment the line below if you also wish to use an image logo */}
              {/* <img src="assets/img/logo.png" alt=""> */}
              <h1 className="sitename">Medilab</h1>
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <Link to={"/"} className="active">
                    Home
                    <br />
                  </Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/services"}>Services</Link>
                </li>
                <li>
                  <Link to={"/department"}>Departments</Link>
                </li>
                <li>
                  <Link to={"/doctors"}>Doctors</Link>
                </li>
                {userToken && userToken.role === "doctor" && (
                  <li>
                    <Link to="/requested-appointments">
                      Requested Appointments
                    </Link>
                  </li>
                )}

                {userToken && userToken.role === "user" && (
                  <li>
                    <Link to="/my-appointments">My Appointments</Link>
                  </li>
                )}
                <li>
                  <Link to={"/contact"}>Contact</Link>
                </li>
                {userToken && userToken.role === "admin" && (
                  <li>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                )}
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
            <Link className="cta-btn d-none d-sm-block" to={"/appointment"}>
              Make an Appointment
            </Link>
            {userToken ? (
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            ) : (
              <Link className="cta-btn d-none d-sm-block" to={"/login"}>
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
