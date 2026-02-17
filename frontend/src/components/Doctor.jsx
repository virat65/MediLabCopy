import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../Backendroutes";

function Doctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(api.getDoctors.url).then((res) => {
      if (res.data.status === 200) {
        setDoctors(res.data.body);
      }
    });
  }, []);

  return (
    <>
      {/* Doctors Section */}
      <section id="doctors" className="doctors section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Doctors</h2>
          <p>All registered doctors</p>
        </div>
        <div className="container">
          <div className="row gy-4">
            {doctors.map((doc, idx) => (
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay={100 * (idx + 1)}
                key={doc._id}
              >
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src={
                        doc.image
                          ? `${process.env.REACT_APPBACKEND_ROUTING}/images/userImage/${doc.image}`
                          : "assets/img/doctors/doctors-1.jpg"
                      }
                      className="img-fluid"
                      alt={doc.name}
                    />
                  </div>
                  <div className="member-info">
                    <h4>{doc.name}</h4>
                    <span>{doc.specialization}</span>
                    <p>
                      <b>Email:</b> {doc.email}
                      <br />
                      <b>Mobile:</b> {doc.mobile}
                      <br />
                      <b>Experience:</b> {doc.experience}
                      <br />
                      <b>Qualification:</b> {doc.qualification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {doctors.length === 0 && (
              <div className="col-12 text-center">
                <p>No doctors found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Doctor;
