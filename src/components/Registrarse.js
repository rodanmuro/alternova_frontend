import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registrarse = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function registrarse() {
    

    axios
      .post("http://localhost:8080/registrarse", {
        username: username,
        password: password,
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
      <div>
      <div class="container col-md-4">
        <h2>Registrarse</h2>
        
        <div class="form-ouline mb-4 ">
            <input
              type="text"
              value={username}
              class="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label class="form-label">Usuario</label>
          </div>

          <div class="form-ouline mb-4 ">
            <input
              type="password"
              value={password}
              class="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label class="form-label">Password</label>
          </div>
          <button class="btn btn-success" onClick={registrarse}>
            Registrarse
          </button>
        
          </div>
      </div>
    </>
  );
};

export default Registrarse;
