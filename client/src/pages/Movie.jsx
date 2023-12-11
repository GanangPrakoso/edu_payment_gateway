import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Movie() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios({
        url: "http://localhost:3000/user",
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });

      if (data.isSubscribed) {
        fetchMovies();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gausah ngadi ngadi",
          text: "Situ belum subscribe!",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error, "<<<<");
    }
  };

  const fetchMovies = async () => {
    try {
      const { data } = await axios({
        url: "http://localhost:3000/movies",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setMovies(data);
    } catch (error) {
      console.log(error, "<<<");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="movie">
      <div className="container">
        <div className="d-flex justify-content-center">
          <Banner />
        </div>
        <div className="card-container">
          {movies.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
