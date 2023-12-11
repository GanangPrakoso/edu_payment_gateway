import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import Swal from "sweetalert2";

function loginCheck() {
  if (!localStorage.access_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please login first brodi",
    });

    return redirect("/login");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loginCheck,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => (localStorage.access_token ? redirect("/") : null),
  },
  {
    path: "/movies",
    element: <Movie />,
    loader: loginCheck,
  },
]);

export default router;
