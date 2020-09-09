import React from "react";


function HikingBuddy({hikingBuddyInfo, handleChangeHikingBuddyDate, handleChangeHikingBuddyZip, handleSubmitHikingBuddy, hikingBuddyVisible}) {
    return (
        <div className="hikingBuddy">
        
        <form className="form" onSubmit={handleSubmitHikingBuddy}>

          <label>
            Zip Code:
          <input onChange={handleChangeHikingBuddyZip} />
          </label>
          <label>
            Date:
          <input type="date" onChange={handleChangeHikingBuddyDate} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {hikingBuddyVisible &&
          <div> Your Hiking Info:
          <div>{hikingBuddyInfo.date && hikingBuddyInfo.date}</div>
            <div>{hikingBuddyInfo.zip && hikingBuddyInfo.zip}</div>
          </div>}
        </div>
    );
}

export default HikingBuddy

