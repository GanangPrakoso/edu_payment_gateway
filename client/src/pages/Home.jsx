export default function Home() {
  const isSubscribed = false;

  return (
    <div className="wrapper-home">
      <div>
        <h2 className="regular-pt-sans">
          👋 Hai, welcome to this simple app 😜 Your status is
          <span className={isSubscribed ? "rainbow-fast" : "rainbow"}>
            {isSubscribed ? " subscribed" : " not subscribe yet"}
          </span>
        </h2>
        <h2 className="small-pt-sans">
          👉{" "}
          {isSubscribed
            ? "you already subscribed bruv, now you can see our movie list!"
            : "Click here to subscribe"}{" "}
          👈
        </h2>
        <h5 className="small-small-pt-sans">
          or you want to logout instead? 🤔
        </h5>
      </div>
    </div>
  );
}
