import React, { useState } from "react";
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(e) {
    e.preventDefault();
    await fetch('https://studentblog-backend.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });
  }

  return (
    <>
      <div className="login-page">
        <form
          className="loginform d-flex flex-column row-gap-2 justify-content-center"
          onSubmit={register}
        >
          <h1 className="align">Please Register</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
