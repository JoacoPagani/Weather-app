import './style.css';
import axios from 'axios';  // Simplemente importa axios directamente

const apikey = '2CAAR5HQLNQCVEDKHV3GKWWNQ';

const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

const getWeatherData = async (location) => {
    try {
        const response = await axios.get(`${baseUrl}${location}?unitGroup=metric&include=current&key=${apikey}&contentType=json`);
        displayWeather(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('#weather-info').innerHTML = '<p>Error: Ciudad no encontrada</p>';
    }
};

document.querySelector('#search-btn').addEventListener('click', () => {
    const location = document.querySelector('#city-input').value;
    getWeatherData(location);
});

function displayWeather(data) {
    const temperature = Math.round(data.currentConditions.temp);
    const description = data.currentConditions.conditions;
    const humidity = data.currentConditions.humidity;
    const windSpeed = Math.round(data.currentConditions.windspeed);
    const feelsLike = Math.round(data.currentConditions.feelslike);
    
    // Función para determinar el icono según la condición
    const getWeatherIcon = (conditions) => {
        const condition = conditions.toLowerCase();
        if (condition.includes('clear')) return 'sun';
        if (condition.includes('cloud')) return 'cloud';
        if (condition.includes('rain')) return 'cloud-rain';
        if (condition.includes('snow')) return 'snowflake';
        if (condition.includes('storm')) return 'bolt';
        return 'cloud';
    };

    document.querySelector('#weather-info').innerHTML = `
        <div class="weather-container">
            <div class="location">
                <i class="fas fa-location-dot location-icon"></i>
                <h2 class="city-name">${data.resolvedAddress}</h2>
            </div>
            <div class="main-temp">
                <i class="fas fa-${getWeatherIcon(description)} weather-icon"></i>
                <div class="temp-container">
                    <span class="temperature">${temperature}°</span>
                    <p class="description">${description}</p>
                </div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <i class="fas fa-temperature-half"></i>
                    <div class="detail-info">
                        <span class="detail-label">Sensación térmica</span>
                        <span class="detail-value">${feelsLike}°</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-droplet"></i>
                    <div class="detail-info">
                        <span class="detail-label">Humedad</span>
                        <span class="detail-value">${humidity}%</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <div class="detail-info">
                        <span class="detail-label">Viento</span>
                        <span class="detail-value">${windSpeed} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}








