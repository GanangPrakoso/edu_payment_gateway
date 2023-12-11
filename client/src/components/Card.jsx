export default function Card({ data }) {
  const imageDummy =
    "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg";

  return (
    <div className="movie-container">
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div />
      </div>
      <p className="card-font">{data.title}</p>
    </div>
  );
}
