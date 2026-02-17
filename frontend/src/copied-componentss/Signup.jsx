import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [role, setRole] = useState("user"); // 1-user, 2-doctor, 3-admin
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    specialization: "",
    experience: "",
    qualification: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("password", data.password);
      formData.append("role", role);
      if (image) formData.append("image", image);

      if (role === "doctor") {
        formData.append("specialization", data.specialization);
        formData.append("experience", data.experience);
        formData.append("qualification", data.qualification);
      }

      const res = await axios.post(
        `http://localhost:3333/signUp`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(res.data.message);
      navigate("/Login");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error, "Error");
    }
  };

  return (
    <main className="main">
      <section className="section" id="signup">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-6">
              <div className="card p-4 shadow">
                <h3 className="text-center mb-3">Create Account</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Register as</label>
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
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Mobile</label>
                    <input
                      type="number"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter Your Mobile"
                      value={data.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  {role === "doctor" && (
                    <>
                      <div className="form-group mb-3">
                        <label>Specialization</label>
                        <select
                          name="specialization"
                          className="form-control"
                          value={data.specialization}
                          onChange={handleChange}
                        >
                          <option value="">Select Specialization</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Hepatology">Hepatology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Eye Care">Eye Care</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <label>Experience</label>
                        <input
                          type="text"
                          name="experience"
                          className="form-control"
                          placeholder="Experience"
                          value={data.experience}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Qualification</label>
                        <input
                          type="text"
                          name="qualification"
                          className="form-control"
                          placeholder="Qualification"
                          value={data.qualification}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Signup
                  </button>
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
