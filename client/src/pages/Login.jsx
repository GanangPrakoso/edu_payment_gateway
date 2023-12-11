import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: loginForm,
      });

      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error, "<<<");
    }
  };

  return (
    <div className="wrapper">
      <h1 style={{ color: "white", marginBottom: "20px" }}>Login pls</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={changeHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-outline-warning">
          Submit
        </button>
      </form>
    </div>
  );
}
