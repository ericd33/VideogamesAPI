import "./Details.css";

export default function Details({ vg }) {
  if (vg) 
    return (
      <div className="details-wrap">
        <h1>{vg && vg.name}</h1>
        <div className="details-box">
          <div
            className="backimg"
            style={{ "background-image": `url(${vg.background_image})` }}
          ></div>

          <div className="infosplit">
            <h3>Rating</h3>
            {vg && vg.rating}
          </div>

          <div className="infosplit">
            <h3>Platforms</h3>
            <ul>
              {vg.platforms.map((obj) => (
                <li>{obj.platform && obj.platform.name}</li>
              ))}
            </ul>
          </div>

          <div className="infosplit">
            <h3>Release Date</h3>
            {vg.released}
          </div>

          <div className="infosplit desc">
            <h3>Description</h3>
            <section>{vg.description}</section>
          </div>
        </div>
      </div>
    );

  return <></>;
}
