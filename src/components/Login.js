import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function getToken(user, pass) {
    axios
      .post("http://localhost:8080/authenticate", {
        username: user,
        password: pass,
      })
      .then((resp) => {
        localStorage.setItem("user", username);
        localStorage.setItem("jwt", resp.data.jwt);
        navigate("/profile");
        console.log("token " + resp.data.jwt);
      });
  }

  return (
    <>
      
      <div class="container col-md-4">
      <h2>Login</h2>
      
      <div class="form-ouline mb-4 ">
      <input
        type="text"
        value={username}
        class="form-control"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label class="form-label" for="form2Example2">Usuario</label>
      </div>
      <div class="form-outline mb-4">
      <input
        type="password"
        value={password}
        class="form-control"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name=""
        id=""
      />
      <label class="form-label" for="form2Example2">Password</label>
      </div>


      <button type="submit" class="btn btn-primary" onClick={() => getToken(username, password)}>Login</button>
      
      </div>
    </>
  );
};

export default Login;
