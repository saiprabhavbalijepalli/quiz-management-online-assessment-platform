import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = (event) => {
  event.preventDefault();

  if (email.trim() === "" || password.trim() === "") {
    setError("Please enter email and password.");
    return;
  }

  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminEmail", email);

    navigate("/admin-dashboard");
  } else {
    setError("Invalid admin email or password.");
  }
};

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Admin Login</h1>

        <p>Login to manage quizzes and view student results</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;