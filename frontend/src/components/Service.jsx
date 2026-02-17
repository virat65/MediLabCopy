import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Backendroutes";

const SERVICES = [
  { name: "Cardiology", icon: "fas fa-heartbeat" },
  { name: "Neurology", icon: "fas fa-brain" },
  { name: "Hepatology", icon: "fas fa-liver" },
  { name: "Pediatrics", icon: "fas fa-baby" },
  { name: "Eye Care", icon: "fas fa-eye" },
];

function Service() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [doctors, setDoctors] = useState([]);

  const handleAppointmentClick = (doctor) => {
    const user = sessionStorage.getItem("userInfo");
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/appointment?doctorId=${doctor._id}`);
    }
  };

  useEffect(() => {
    if (selectedService) {
      axios
        .get(
          `${api.getDoctorsBySpecialization.url}?specialization=${selectedService}`
        )
        .then((res) => {
          if (res.data.status === 200) {
            setDoctors(res.data.body);
          } else {
            setDoctors([]);
          }
        })
        .catch((err) => {
          console.error(err);
          setDoctors([]);
        });
    }
  }, [selectedService]);

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Select a service to see available doctors.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {SERVICES.map((service, idx) => (
            <div
              key={service.name}
              className={`col-lg-4 col-md-6 ${
                selectedService === service.name ? "border border-primary" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={100 * (idx + 1)}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedService(service.name)}
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className={service.icon} />
                </div>
                <h3>{service.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <h4>
            Doctors for <span className="text-primary">{selectedService}</span>
          </h4>

          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <div className="col-md-6 mt-3" key={doc._id}>
                <div className="card">
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={
                        doc.image
                          ? `${process.env.REACT_APPBACKEND_ROUTING}/images/userImage/${doc.image}`
                          : "assets/img/doctors/doctors-1.jpg"
                      }
                      alt={doc.name}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: 20,
                      }}
                    />
                    <div>
                      <h5>{doc.name}</h5>
                      <div>
                        <b>Experience:</b> {doc.experience}
                      </div>
                      <div>
                        <b>Qualification:</b> {doc.qualification}
                      </div>
                      <div>
                        <b>Email:</b> {doc.email}
                      </div>
                      <div>
                        <b>Mobile:</b> {doc.mobile}
                      </div>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleAppointmentClick(doc)}
                      >
                        Make Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 mt-3">
              <p>No doctors found for this specialization.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Service;
