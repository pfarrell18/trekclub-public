import React from 'react';
import noimage from "../Images/NoImage.png"

const Hike = ({img, name, summary, stars, length, location, coordinates, handleClick, starred, url}) => {
    return (
        <div className="card">
            <div className="card-content">
            {img ?
            <img src={img} alt={name} className="hikeimage"/>: 
            <img src={noimage} alt={name} className="hikeimage"/>
            }
            <a className = "title is-6 hikeitem" href={url} add target="_blank">{name}</a>
            <h2 className = "hikeitem"><b>{location}</b></h2>
            <p className="hikeitem">{length} Miles</p>
            {/* <p className="hikeitem">{summary}</p> */}
            <p className="hikeitem">Stars: {stars}/5</p>

            {starred ? <img src="https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png" alt = "starred" className="goldStar"/>:<button className ="button is-light" onClick={handleClick}>Save</button>}
            </div>
        </div>    
    ) 
}

export default Hike;