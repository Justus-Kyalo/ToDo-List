import React, { useState } from "react";
import "./loginform.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if login is successful, for example by sending a request to the server
    const successfulLogin = true;

    if (successfulLogin) {
      window.alert("Login success!");
    } else {
      window.alert("Login failed!");
    }
  };

  return (
    <div className="cover">
      <h1>Login</h1>
      <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div className="login-btn" onClick={handleLogin}>
        Login
      </div>
    </div>
  );
};

export default LoginForm;
