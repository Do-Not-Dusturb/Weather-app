const apiKey = '5f6e24db1678b4e81bff4d565266338a';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const units = 'imperial'; // Request temperature in Fahrenheit

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `${baseUrl}${city}&appid=${apiKey}&units=${units}`;

    const weatherData = document.getElementById('weatherData');

    // Reset transition properties
    weatherData.style.transition = 'none';
    weatherData.style.opacity = 0;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found!');
            }
            return response.json();
        })
        .then(data => {
            const city = data.name;
            const country = data.sys.country;
            const weather = data.weather[0].main;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            weatherData.innerHTML = `
                <h2>${city}, ${country}</h2>
                <p>${weather}</p>
                <p>Temperature: ${temperature}°F</p>
                <p>Humidity: ${humidity}%</p>
            `;
            
            // Apply smooth animation after resetting transition properties
            setTimeout(() => {
                weatherData.style.transition = 'all 0.5s';
                weatherData.style.opacity = 1;
            }, 50); // Small delay for resetting transition
        })
        .catch(error => {
            // Display error message with smooth animation
            weatherData.innerHTML = `<h2>City not found!</h2>`;
            
            // Apply smooth animation to 'City not found!' message
            setTimeout(() => {
                weatherData.style.transition = 'all 0.5s';
                weatherData.style.opacity = 1;
            }, 50); // Small delay for resetting transition

            console.error('Error:', error);
        });
}
