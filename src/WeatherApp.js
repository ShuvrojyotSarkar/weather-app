import React, { useState, useEffect, useCallback } from "react";
import "./WeatherApp.css"; // Import the CSS file

const WeatherApp = () => {
  const [city, setCity] = useState("Falakata"); // Default city
  const [weather, setWeather] = useState(null); // State for weather data
  const [unit, setUnit] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const fetchWeather = useCallback(async () => {
    if (!city.trim()) {
      alert("Please enter a valid city name!");
      return;
    }

    const API_KEY = "f3bfed24ca2d766e54782d801dd66369";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=${unit}&appid=${API_KEY}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data); // Set the fetched weather data in state
    } catch (error) {
      setError(error.message);
      setWeather(null); // Clear previous weather data
    } finally {
      setLoading(false);
    }
  }, [city, unit]); // Dependencies: city and unit

  // Fetch default city weather on initial load and when the unit changes
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Weather App</h1>

      <div className="flex space-x-3 mb-4">
        {/* Input field for city */}
        <input
          type="text"
          placeholder="Enter city"
          className="border border-gray-300 rounded-md px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* Button to fetch weather */}
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display Weather Data */}
      {weather && !loading && (
        <div className="bg-white shadow-lg rounded-md p-6">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p className="text-gray-600">
            {weather.main?.temp || "N/A"}° {unit === "metric" ? "C" : "F"}
          </p>
          <p>Humidity: {weather.main?.humidity || "N/A"}%</p>
          <p>
            Wind Speed: {weather.wind?.speed || "N/A"}{" "}
            {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>
      )}

      {/* Button to toggle between Celsius and Fahrenheit */}
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
