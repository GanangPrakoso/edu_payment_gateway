import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const { data } = await axios({
        url: "http://localhost:3000/user",
        headers: { authorization: `Bearer ${localStorage.access_token}` },
      });

      setUser(data);
    } catch (error) {
      console.log(error, "<<<<");
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  const subscribe = () => {
    if (user.isSubscribed) {
      navigate("/movies");
    } else {
      // IMPLEMENT MIDTRANS HERE!
      Swal.fire("Feature not yet implemented");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="wrapper-home">
      <div>
        <h2 className="regular-pt-sans">
          👋 Hai, welcome to this simple app 😜 Your status is
          <span className={user.isSubscribed ? "rainbow-fast" : "rainbow"}>
            {user.isSubscribed ? " subscribed" : " not subscribe yet"}
          </span>
        </h2>
        <h2 className="small-pt-sans" onClick={subscribe}>
          👉{" "}
          {user.isSubscribed
            ? "you already subscribed bruv, now you can see our movie list!"
            : "Click here to subscribe"}{" "}
          👈
        </h2>
        <h5 className="small-small-pt-sans" onClick={logoutHandler}>
          or you want to logout instead? 🤔
        </h5>
      </div>
    </div>
  );
}
