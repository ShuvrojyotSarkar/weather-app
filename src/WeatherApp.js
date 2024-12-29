import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric"); // Default: Celsius

  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const fetchWeather = async () => {
    const API_KEY = "your_api_key"; // Replace with your OpenWeatherMap API key
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Weather App</h1>
      <div className="flex space-x-3 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          className="border border-gray-300 rounded-md px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {weather && (
        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p className="text-gray-600">
            {weather.main.temp}° {unit === "metric" ? "C" : "F"}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
        </div>
      )}
      <button
        onClick={handleToggleUnit}
        className="mt-4 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
      >
        Toggle to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
};

export default WeatherApp;
