import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import axios from "axios";

export default function Movie() {
  const [movies, setMovies] = useState([]);

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
    fetchMovies();
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
