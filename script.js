const apiKey = '3ccb53d4c43819a246d23fa0381a146b';
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
         weatherData.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].main}</p>
            <p>Temperature: ${convertToFahrenheit(data.main.temp)}°F</p>
            <p>Humidity: ${data.main.humidity}%</p>
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

function convertToFahrenheit(celsius) {
   return Math.round((celsius * 9/5) + 32);
}
