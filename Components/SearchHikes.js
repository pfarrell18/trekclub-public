import React from "react";
import Hike from "./Hikes"



function SearchHikes({ handleSubmit, searchZip, handleChange, searchedHikes, saveSearchedHike, setSearchedHikes }) {
    return (
        <div>

            <div class="search">
                <form className="form1" onSubmit={handleSubmit}>
                <div class="field">
                    <label>
                        Zip Code:
                     <input className="input" value={searchZip} onChange={handleChange} />
                    </label>
                    <div class="control">
                        <input className="button is-primary" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
            </div>
            <div className="container">
                {searchedHikes &&
                    searchedHikes.map((hike) => {
                        return (
                            <Hike
                                handleClick={() => saveSearchedHike(hike, searchedHikes, setSearchedHikes)}
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
                        );
                    })}
            </div>
        </div>

    );
}

export default SearchHikes