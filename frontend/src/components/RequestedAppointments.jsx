import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../Backendroutes";

function RequestedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [rescheduleDate, setRescheduleDate] = useState({});
  const [modalData, setModalData] = useState(null);
  const doctor = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const fetchAppointments = () => {
    if (doctor && doctor._id) {
      axios
        .get(`${api.getDoctorAppointments.url}?doctorId=${doctor._id}`)
        .then((res) => {
          if (res.data.status === 200) setAppointments(res.data.body);
          else setAppointments([]);
        })
        .catch((err) => {
          console.error(err);
          setAppointments([]);
        });
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [doctor]);

  const handleStatus = async (appointmentId, status, extra = {}) => {
    try {
      await axios.post(api.updateAppointmentStatus.url, {
        appointmentId,
        status,
        ...extra,
      });
      toast.success(`Appointment ${status}`);
      setRescheduleDate((prev) => ({ ...prev, [appointmentId]: "" }));
      fetchAppointments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update appointment");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Requested Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointment requests yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Patient Details</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.userId?.name}</td>
                <td>{a.userId?.email}</td>
                <td>
                  {a.status === "rescheduled" ? a.rescheduleDate : a.date}
                </td>
                <td>{a.message}</td>
                <td>
                  {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  {a.status === "rejected" && a.rejectionReason && (
                    <div style={{ color: "red" }}>
                      Reason: {a.rejectionReason}
                    </div>
                  )}
                </td>
                <td>
                  {a.status === "pending" && (
                    <>
                      <div className="d-flex gap-2 mb-2">
                        <button
                          className="btn btn-success btn-sm w-100"
                          onClick={() => handleStatus(a._id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm w-100"
                          onClick={() => {
                            const reason = prompt(
                              "Enter rejection reason (optional):"
                            );
                            handleStatus(a._id, "rejected", {
                              rejectionReason: reason,
                            });
                          }}
                        >
                          Reject
                        </button>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <input
                          type="datetime-local"
                          className="form-control form-control-sm"
                          style={{ width: "200px" }}
                          value={rescheduleDate[a._id] || ""}
                          onChange={(e) =>
                            setRescheduleDate((prev) => ({
                              ...prev,
                              [a._id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            if (rescheduleDate[a._id])
                              handleStatus(a._id, "rescheduled", {
                                rescheduleDate: rescheduleDate[a._id],
                              });
                          }}
                        >
                          Reschedule
                        </button>
                      </div>
                    </>
                  )}

                  {(a.status === "accepted" || a.status === "rescheduled") && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm me-1 mt-1"
                        onClick={() => handleStatus(a._id, "completed")}
                      >
                        Mark Completed
                      </button>
                      <button
                        className="btn btn-primary btn-sm mt-1"
                        onClick={() =>
                          navigate(
                            `/prescription?appointmentId=${a._id}&userId=${a.userId?._id}`
                          )
                        }
                      >
                        Prescription / Chat
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm w-100"
                    onClick={() => setModalData(a.userId)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Patient Details Modal */}
      {modalData && (
        <div
          className="modal show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Patient Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalData(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <b>Name:</b> {modalData.name}
                  <br />
                  <b>Email:</b> {modalData.email}
                  <br />
                  <b>Mobile:</b> {modalData.mobile}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestedAppointments;
