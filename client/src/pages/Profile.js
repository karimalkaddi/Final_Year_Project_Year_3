import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/api/profile", {
      headers: authHeader,
    });
    const data = await res.json();
    setName(data.name || "");
  };

  const saveName = async () => {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  const changePassword = async () => {
    const res = await fetch(
      "http://localhost:5000/api/profile/password",
      {
        method: "PUT",
        headers: authHeader,
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Profile</h2>

      {/* NAME */}
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveName}>Save Name</button>

      <hr style={{ margin: "20px 0" }} />

      {/* PASSWORD */}
      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={changePassword}>Change Password</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
