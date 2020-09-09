import React from "react";
import Hike from "./Hikes"


function MyHikes({savedHikes, saveHike, setHikes, hikes}) {
    return (
        <div>
            <div className="saved">
                <h1 className="title hikes-header">Your Saved Hikes</h1>
            </div>
            {(savedHikes.length===0) ? 
                    <div>You don't have any saved hikes!</div>:
            <div className="container">
                    {savedHikes.map((hike) => {
                            return (
                                <Hike
                                    handleClick={() => saveHike(hike, hikes, setHikes)}
                                    img={hike.imgMedium}
                                    key={`${hike.id}saved`}
                                    name={hike.name}
                                    summary={hike.summary}
                                    stars={hike.stars}
                                    length={hike.length}
                                    location={hike.location}
                                    coordinates={[hike.latitude, hike.longitude]}
                                    starred={hike.starred}
                                />
                            );
                        })}
                </div>}
            </div>
    );
}

export default MyHikes