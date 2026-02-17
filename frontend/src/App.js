import logo from "./logo.svg";
import "./App.css";
import RequestedAppointments from "./components/RequestedAppointments";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MainSection from "./components/MainSection";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import About from "./components/About";
import Prescription from "./components/Prescription";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import CoursesDetail from "./components/CoursesDetail";
import Events from "./components/Events";
import Pricing from "./components/Pricing";
import Trainer from "./components/Trainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import HeroSection from "./components/HeroSection";
import Stat from "./components/Stat";
import Service from "./components/Service";
import Appointment from "./components/Appointment";
import Department from "./components/Department";
import Doctor from "./components/Doctor";
import FAQ from "./components/FAQ";
import Testimonial from "./components/Testimonial";
import MyAppointments from "./components/MyAppointments";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HeroSection />}></Route>
          {/* <Route path='/' element={<MainSection/>}></Route> */}
          <Route path="/About" element={<About />}></Route>
          <Route path="/Stat" element={<Stat />}></Route>
          <Route path="/services" element={<Service />}></Route>
          <Route path="/Appointment" element={<Appointment />}></Route>
          <Route path="/Department" element={<Department />}></Route>
          <Route path="/doctors" element={<Doctor />}></Route>
          <Route path="/FAQ" element={<FAQ />}></Route>
          <Route path="/Testimonial" element={<Testimonial />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Courses" element={<Courses />}></Route>
          <Route path="/CoursesDetail" element={<CoursesDetail />}></Route>
          <Route path="/Events" element={<Events />}></Route>
          <Route path="/Pricing" element={<Pricing />}></Route>
          <Route path="/Trainer" element={<Trainer />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/requested-appointments"
            element={<RequestedAppointments />}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
