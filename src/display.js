export const display = (() => {
    const dateInfo = document.querySelector('.date-info');
    const btnFind = document.querySelector('.btn-find');
    const inputFind = document.querySelector('.location-find');
    const mainHeader = document.querySelector('.main-header');
    const minTemp = document.querySelector('.min-temp');
    const maxTemp = document.querySelector('.max-temp');
    const weatherInfo = document.querySelector('.weather-info');
    const wsInfo = document.querySelector('.ws-info');
    const uvInfo = document.querySelector('.uv-info');
    const humidityInfo = document.querySelector('.humidity-info');
    const tflInfo = document.querySelector('.tfl-info');
    const options = dateInfo.options;

    const celMode = document.querySelector('.cel-mode');
    const fahrMode = document.querySelector('.fahr-mode');

    return {
        fillDate: function (responseData) {
            for (let i = 0; i < options.length; i++) {
                options[i].textContent = responseData.days[i].datetime;
            }
        },
        celMode: function () {
            celMode.classList.add('mode-active');
        },
        celModeReset: function() {
            celMode.classList.remove('mode-active');
        },
        fahrModeReset: function() {
            fahrMode.classList.remove('mode-active');
        },
        fahrMode: function() {
            fahrMode.classList.add('mode-active');
        },
        alertMessage: function () {
            alert("Oops! you haven't entered any value.")
        },
        updateTempInfo: function(callback, responseData, index){
            mainHeader.textContent = callback(responseData.days[index].temp);
            minTemp.textContent = callback(responseData.days[index].tempmin);
            maxTemp.textContent = callback(responseData.days[index].tempmax);
        },
        updateWeatherInfo: function(responseData, index) {
            weatherInfo.textContent = responseData.days[index].conditions;
            wsInfo.textContent = responseData.days[index].windspeed;
            uvInfo.textContent = responseData.days[index].uvindex;
            humidityInfo.textContent = responseData.days[index].humidity;
            tflInfo.textContent = responseData.days[index].feelslike;
        },
        updateAddress: (responseData) => {
            document.querySelector('address').textContent = responseData.resolvedAddress;
        }
    }
})()