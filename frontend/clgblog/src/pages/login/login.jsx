import React, { useState } from "react";
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch('https://studentblog-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Action when login succeeds
        alert("Login successful! 🎉");
        console.log("User:", data.user);

        
        window.location.href = "/addmaterial";
      } else {
        // ❌ Action when login fails
        alert(data.error || "Login failed!");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <form
        className="loginform d-flex flex-column row-gap-2 justify-content-center"
        onSubmit={login}
      >
        <h1 className="align">please login</h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingInput">name</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-success w-100" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

export default Login;
