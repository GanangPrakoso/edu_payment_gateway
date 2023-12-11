export default function Login() {
  return (
    <div className="wrapper">
      <h1 style={{ color: "white", marginBottom: "20px" }}>Login pls</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-outline-warning">
          Submit
        </button>
      </form>
    </div>
  );
}
