import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Backendroutes"; // 🔹 Use backend routing from api

function Prescription() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appointmentId = params.get("appointmentId");
  const userId = params.get("userId");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = JSON.parse(sessionStorage.getItem("userInfo"));

  // 🔹 Fetch prescription/chat messages for this appointment
  const fetchMessages = () => {
    axios
      .get(`${api.getPrescriptions.url}?appointmentId=${appointmentId}`)
      .then((res) => {
        if (res.data.status === 200) setMessages(res.data.body);
        else setMessages([]);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch messages");
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [appointmentId]);

  // 🔹 Send prescription/message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await axios.post(api.addPrescription.url, {
        appointmentId,
        doctorId: user.role === "doctor" ? user._id : undefined,
        userId,
        message: input,
        sender: user.role === "doctor" ? "doctor" : "user",
      });
      setInput("");
      fetchMessages(); // 🔹 Refresh messages after sending
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Prescription / Chat</h4>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          height: 300,
          overflowY: "auto",
          marginBottom: 16,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.sender === "doctor" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <b>{msg.sender === "doctor" ? "Doctor" : "Patient"}:</b>{" "}
            {msg.message}
            <div style={{ fontSize: 12, color: "#888" }} className="h-50">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        {messages.length === 0 && <div>No messages yet.</div>}
      </div>
      <form onSubmit={sendMessage} className="d-flex">
        <input
          className="form-control me-2 border border-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write prescription or message..."
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Prescription;
