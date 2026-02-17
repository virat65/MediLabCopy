import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // 0-admin, 1-user, 2-doctor
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios
        .post(`http://localhost:3333/login`, { ...data, role })
        .then((res) => {
          if (res.data.status === 200) {
            setData(res.data.body);
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.body));
            navigate("/");
            toast.success(`Hello ${res.data.body.name}! Login successfully`);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main">
      <section className="section" id="login">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-6">
              <div className="card p-4 shadow">
                <h3 className="text-center mb-3">Welcome Back</h3>
                <form onChange={handleChange} onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Login as</label>
                    <select
                      className="form-control"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      <option value="user">User</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                  <p className="text-center mt-3">
                    Don't have an account? <Link to="/Signup">Signup</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
