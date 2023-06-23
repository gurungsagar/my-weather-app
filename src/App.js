import './App.css';
import React, { useState, useEffect } from 'react';
import notFound from './image/404.png'
import clear from './image/clear.png'
import cloud from './image/cloud.png'
import mist from './image/mist.png'
import rain from './image/rain.png'
import snow from './image/snow.png'
import { NotFound } from './NotFound';


const App = () => {
  const [weather, setWeather] = useState([""]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState();
  const img = notFound;
  const [inWeather, setInWeather] = useState([""]);
  


  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleLocation = (e) => {
    setCity(input)
  }
  

  useEffect(() => {
    const fetchWeatherData = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=be271e8072d9e8bb6ea451fb70cf3cd6`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setWeather(data)
          setInWeather(data.weather)
        })
    }
    fetchWeatherData();
  }, [city]);

  const getImage = () => {
    var state = (inWeather?.map((item, i) => (item.main)));
    console.log(state);
    if (state == "Clouds") {
      return cloud;
    } else if (state =='Rain') {
      return rain;
    }else if (state =='Haze') {
      return mist;
    }else if (state =='Clear') {
      return clear;
    }else if (state =='Snow') {
      return snow;
    } else {
      return '';
    }
  }

  function getConvertedTemp() {
    let temp = Object.values(weather).map(main => (main?.temp * (9 / 5)) + 32);
    return Math.round(temp[3]);
  }
  

  return (
    
      <div class="app-container">
        <div class="search-box">
          <i class="fa-solid fa-location-dot"></i>
          <input type="text" value={this?.city} onChange={handleInputChange} placeholder="Enter your location"></input>
        <button onClick={() => {
          handleLocation();
        }} class = "fa-solid fa-magnifying-glass"></button>
        </div>
      {
      city ?
          <div>
            { 
              !weather.name ?
                <NotFound img = {img} />
               :<div></div>
            }

        <div class = "weather-box">
              <img src={getImage()}></img>
              <h1>{weather.name}</h1>
              <p className="temperature">{getConvertedTemp()} &deg;F</p>
          <p className ="description">{inWeather?.map((item) => item.description)}</p>
        </div>
            {
              weather.name ?
                <div class="weather-details">
                  <div class="humidity">
                    <i class="fa-solid fa-water"></i>
                    <div class="text">
                      {
                        weather.name ? <span>{Object.values(weather).map(main => (
                          main.humidity
                        ))} %</span> : <span></span>
                      }
              
                      <p>Humidity</p>
                    </div>
                  </div>

                  <div class="wind">
                    <i class="fa-solid fa-wind"></i>
                    <div class="text">
                      {
                        weather.name ?
                          <span>{Object.values(weather).map(wind => (
                            wind.speed
                          ))} km/h</span>
                          : <span></span>}
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>
                : <div></div>
            }
        </div> :<div></div>
      }
      
      </div>
      
  );
}

export default App;
