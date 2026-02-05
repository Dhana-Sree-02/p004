import React, { useState } from 'react';
import './App.css';
import { APIURL, callApi } from './lib';

export default function App() {
  const IMGURL = import.meta.env.BASE_URL;
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getData() {
    setError("");
    setData(null);
    if (city === "") {
      setError("Enter name of the city");
      return;
    }
    setIsLoading(true);
    const URL = APIURL(city);
    callApi("GET", URL, "", loadData);
  }

  function loadData(res) {
    setData(res);
    setIsLoading(false);
  }

  return (
    <div className='app'>
      <div className='header'>
        <img src={IMGURL + "logo1.png"} alt='logo' /> 
        Weather App
      </div>

      <div className='section'>
        <h1>How's the Weather at your Place ??</h1>
        <h1>Check Right Now</h1>
        <div className='inputdiv'>
          <input 
            type='text' 
            placeholder='Enter city name' 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
          <button onClick={getData}>Search</button>
        </div>

        <div className='errMsg'>{error}</div>

        {/* Only show container when data exists */}
        {data && (
          <div className='container'>
            <div className='weatherinfo'>
              <h1>{data.name}</h1>
              <img 
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
                alt='weather icon' 
              />
              <div>
                <h1>Temperature - {data.main.temp} °C</h1>
                <p><span>Condition</span><span>{data.weather[0].description}</span></p>
                <p><span>Humidity</span><span>{data.main.humidity}</span></p>
                <p><span>Wind Speed</span><span>{data.wind.speed}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='footer'>
        Copyright @ 2026. All rights reserved - Dhana Sree
      </div>

      {isLoading && (
        <div className='progress'>
          <img src={IMGURL + "loading.gif"} alt='loading' />
        </div>
      )}
    </div>
  );
}
