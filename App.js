import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//background images
import background from "./Images/background.png"
import trek from "./Images/trek.png"
import mountain from "./Images/mountain.png"
import lake from "./Images/lake.png"
import green from "./Images/1.png"
import compass from "./Images/compass.png"

//routes 
import MyHikes from "./Components/MyHikes"
// import HikingBuddy from "./HikingBuddy";
import SearchHikes from "./Components/SearchHikes";
import HikesNearMe from "./Components/HikesNearMe"
import Register from "./Components/Register";
import Login from "./Components/Login"

//helper functions
import geoLocation from "./HelperFunctions/geoLocation";


function App() {
  const [hikes, setHikes] = useState(undefined)
  const [location, setLocation] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [savedHikes, setSavedHikes] = useState([]);
  const [searchedHikes, setSearchedHikes] = useState(undefined)
  const [searchZip, setSearchZip] = useState("")
  const [currentUser, setCurrentUser] = useState(false)
  const [isActive, setisActive] = useState(false)

  //hiking buddy logic 
  // const [hikingBuddyInfo, setHikingBuddyInfo] = useState({})
  // const [hikingBuddyVisible, setHikingBuddyVisible] = useState(false)
  // const [hikingBuddyEntries, setHikingBuddyEntries] = useState([])

  //getting geolocation
  useEffect(() => {
    geoLocation(setLocation)
    console.log("location set")
  }, [])

  //getting weather based on geo-location
  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherdata = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=##APIKEYdeleted##`
      )
      const weatherdataAsJSON = await weatherdata.json()
      console.log(weatherdataAsJSON)
      setWeather(weatherdataAsJSON);
    }
    if (location) fetchWeatherData()
  }, [location])

  //getting hikes based on Location
  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const res = await fetch(
          `https://www.hikingproject.com/data/get-trails?lat=${location[0]}&lon=${location[1]}&maxDistance=10&key=##APIKEYdeleted##`,
          { mode: 'cors' }
        );
        const resAsJSON = await res.json()
        console.log(resAsJSON)
        resAsJSON.trails.map(item => item["starred"] = false)
        setHikes(resAsJSON.trails);
      }
    }
    fetchData()
  }
    , [location]);


  //getting hikes based on search
  useEffect(() => {
    const fetchSearch = async () => {
      if (searchZip.length === 5) {
        const searchdata = await fetch(`https://open.mapquestapi.com/geocoding/v1/address?key=##APIKEYdeleted##&postalCode=${searchZip}`)
        const searchdataAsJSON = await searchdata.json()
        let lat = searchdataAsJSON.results[0].locations[0].displayLatLng.lat
        let lng = searchdataAsJSON.results[0].locations[0].displayLatLng.lng

        const searchLocationData = await fetch(
          `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=##APIKEYdeleted##`,
          { mode: 'cors' }
        );

        const searchLocationDataAsJSON = await searchLocationData.json()
        searchLocationDataAsJSON.trails.map(item => item["starred"] = false)
        console.log("searched Hikes set")
        setSearchedHikes(searchLocationDataAsJSON.trails)
      }
    }
    fetchSearch()
  }
    , [searchZip])

  //saves hikes to saved hikes React State
  const saveHike = (hike, hikestoUpdate, updateFunction) => {
    if (!savedHikes.includes(hike)) {
      hike["starred"] = true
      setSavedHikes([...savedHikes, hike]);

      const updatedHikes = hikestoUpdate
      console.log(hikestoUpdate)
      let hike_index = updatedHikes.indexOf(hike)
      updatedHikes[hike_index].starred = true
      updateFunction(updatedHikes)
    }
  };

  if (currentUser) console.log(`CurrentUser is ${currentUser.username}`)
  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src={trek} className="logo" alt="trek logo" />
          </a>
          <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link to="/login" className="button navbar-item is-primary">
              Login
            </Link>
            <Link to="/register" className="button navbar-item is-primary">
              Sign Up
            </Link>
          </div>
          <div className="navbar-end">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/hikes">Hikes Near Me</Link>
            <Link className="navbar-item" to="/search">Search Hikes</Link>
            <Link className="navbar-item" to="/myHikes">My Hikes</Link>
            <Link className="navbar-item" to="/hikingBuddy">Find a trekbuddy</Link>
          </div>
        </div>
      </nav>

      <div>
        {currentUser !== false && <h1 className="title is-1" >Welcome {currentUser.username}</h1>}
        {weather && (
          <div className="temperature">
            <h1 className="subtitle">{weather.name}</h1>
            <h1 className="title is-4">{Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32)} Degrees</h1>
            <h1 className="subtitle">{weather.weather[0].description}</h1>
          </div>
        )}
        <Switch>
          <Route exact path="/">
            {/* <img src={lake} className="heroFront" alt="hero" /> */}
            <Login />
          </Route>
          <Route path="/hikes">
            {/* <img src={green} className="hero" alt="hikingbuddyhero" /> */}
            <HikesNearMe hikes={hikes} saveHike={saveHike} setHikes={setHikes} weather={weather} />
          </Route>
          <Route path="/search">
            {/* <img src={compass} className="hero" alt="hikingbuddyhero" /> */}
            <SearchHikes
              handleSubmit={(evt) => evt.preventDefault()}
              handleChange={(evt) => setSearchZip(evt.target.value)}
              searchZip={searchZip} searchedHikes={searchedHikes}
              setSearchedHikes={setSearchedHikes}
              saveSearchedHike={saveHike}
            />
          </Route>
          <Route path="/login">
            {/* <img src={mountain} className="heroFront" alt="hikingbuddyhero" /> */}
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/register">
            <section>
              {/* <img src={green} className="hero" alt="hikingbuddyhero" /> */}
              <Register currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </section>

          </Route>
          <Route path="/myHikes">
            {/* <img src={mountain} className="hero" alt="hikingbuddyhero" />
            <h3>Your saved Hikes!</h3> */}
            <MyHikes savedHikes={savedHikes} saveHike={saveHike} hikes={hikes} setHikes={setHikes} />
          </Route>
          <Route path="/hikingBuddy">
            <div className="saved2">
              <h1 className="title hikes-header">Feature Coming Soon!</h1>
            </div>
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
