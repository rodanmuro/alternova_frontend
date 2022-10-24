import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  

  let usuario = localStorage.getItem("user");

  let navigate = useNavigate();

  
  const [contenido, setContenido] = useState("");
  const [myJokes, setMyJokes] = useState([]);

  function getExternalJoke() {
    axios.get("https://api.chucknorris.io/jokes/random").then((resp) => {
      setContenido(resp.data.value);
    });
  }

  function saveJoke() {
    console.log(localStorage.getItem("jwt"));
    axios
      .post(
        "http://localhost:8080/joke",
        {
          texto: contenido,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        }
      )
      .then((resp) => {
        getMyJokes();
        console.log("Guardado" + resp.data.texto);
      });
  }

  function getMyJokes() {
    axios
      .get("http://localhost:8080/joke", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((resp) => {
        if (!resp.data) {
          resp.data = [];
        }
        setMyJokes(resp.data);
        myJokes.map((e) => {
          console.log(e);
        });
      });
  }

  function deleteJoke(valor) {
    axios
      .delete("http://localhost:8080/joke/" + valor, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        getMyJokes();
        console.log("Elemento borrado " + valor);
      });
  }

  function logOut(){
    localStorage.setItem("user","");
    localStorage.setItem("jwt","");
    navigate("/login");
  }

  useEffect(() => {
    getMyJokes();
  }, []);

  return (
    <>
      <div className="container col-md-8 ">
        <div>
          <nav class="navbar navbar-light bg-light border rounded m-2">
            <div class="container-fluid">
              <span class="navbar-brand mb-0 h1">Hola {usuario}</span>
              <ul class="navbar-nav  my-2 my-lg-0 navbar-nav-scroll">
                <li class="nav-item">
                  <a class="nav-link" onClick={logOut} href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="border rounded m-2">
            <div className="bg-light p-2">Get Joke</div>
            <div class="form-outline mb-4">
              <div className="border rounded m-2">{contenido}</div>
            </div>

            <div class="d-flex  justify-content-end form-outline mb-4 text-right">
              <button
                type="submit"
                class="btn btn-primary m-2"
                onClick={getExternalJoke}
              >
                Get Joke
              </button>

              <button
                type="submit"
                class="btn btn-primary m-2"
                onClick={saveJoke}
              >
                Save Joke
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded m-2">
          <div className="bg-light p-2">My Jokes</div>
          <div className="d-flex  justify-content-end">
            <button class="btn btn-primary m-2" onClick={getMyJokes}>
              Get My Jokes
            </button>
          </div>
          <table className="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Joke</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>

            <tbody>
              {myJokes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.texto}</td>
                  <td>
                    <button
                      class="btn btn-danger m-2"
                      onClick={() => deleteJoke(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
