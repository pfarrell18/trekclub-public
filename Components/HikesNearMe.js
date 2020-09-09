import React from "react";
import Hike from "./Hikes"


function HikesNearMe({weather, hikes, saveHike, setHikes }) {
  return (
    <div>
      <div className="saved1">
  <h1 className="title hikes-header">Hikes near {weather.name}</h1>
      </div>
      <div className="container">
        {hikes &&
          hikes.map((hike) =>
            (
              <Hike
                handleClick={() => saveHike(hike, hikes, setHikes)}
                img={hike.imgMedium}
                key={hike.id}
                name={hike.name}
                summary={hike.summary}
                stars={hike.stars}
                length={hike.length}
                location={hike.location}
                coordinates={[hike.latitude, hike.longitude]}
                starred={hike.starred}
                url={hike.url}
              />
            )
          )}
      </div>
    </div>
  );
}

export default HikesNearMe

