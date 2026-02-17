import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [modalData, setModalData] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:3333/user-appointments?userId=${user._id}`)
        .then((res) => {
          if (res.data.success) setAppointments(res.data.body);
        });
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h3>My Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Date</th>
              <th>Your Message</th>
              <th>Status</th>
              <th>Doctor Reply</th>
              <th>Prescription/Chat</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.doctorId?.name}</td>
                <td>{a.doctorId?.specialization}</td>
                <td>{a.status === "rescheduled" ? a.rescheduleDate : a.date}</td>
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
                  {a.status === "accepted" && (
                    <span style={{ color: "green" }}>Accepted</span>
                  )}
                  {a.status === "rejected" && (
                    <span style={{ color: "red" }}>Rejected</span>
                  )}
                  {a.status === "rescheduled" && (
                    <span style={{ color: "orange" }}>
                      Rescheduled: {a.rescheduleDate}
                    </span>
                  )}
                  {a.status === "pending" && <span>Pending</span>}
                  {a.status === "completed" && (
                    <span style={{ color: "blue" }}>Completed</span>
                  )}
                </td>
                <td>
                  {(a.status === "accepted" || a.status === "completed") && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(
                          `/prescription?appointmentId=${a._id}&userId=${user._id}`
                        )
                      }
                    >
                      Prescription / Chat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;