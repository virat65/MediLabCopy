import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log(parsedUser, "Parsed User");
    }
  }, []);
  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  console.log(user,'uuu')

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="text-center">
          <img
            src={user.prevImg || "/default-avatar.png"}
            alt="Profile"
            className="rounded-circle mb-3"
            width="120"
            height="120"
          />
          <h3>{user.name}</h3>
          <p className="text-muted">{user.role?.toUpperCase()}</p>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6 mb-3">
            <strong>UID:</strong>
            <p>{user.uid}</p>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Mobile:</strong>
            <p>{user.mobile}</p>
          </div>

          {user.role === "doctor" && (
            <>
              <div className="col-md-6 mb-3">
                <strong>Specialization:</strong>
                <p>{user.specialization}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Experience:</strong>
                <p>{user.experience}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Qualification:</strong>
                <p>{user.qualification}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
