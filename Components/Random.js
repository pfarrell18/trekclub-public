import React from "react";


function Random({playingAround, setPlayingAround}) {


    return (<div>
        <button onClick={()=>{
            console.log("hi")
            setPlayingAround("hello")
            }}>CLICK</button>
            {playingAround}
        </div>
        );
    }
    
    export default Random
    