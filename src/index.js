import "./style/main.css"


const btnFind = document.querySelector('.btn-find');
const inputFind = document.querySelector('.location-find');
const mainHeader = document.querySelector('.main-header');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const weatherInfo = document.querySelector('.weather-info');
const dateInfo = document.querySelector('.date-info');
const wsInfo = document.querySelector('.ws-info');
const uvInfo = document.querySelector('.uv-info');
const humidityInfo = document.querySelector('.humidity-info');
const tflInfo = document.querySelector('.tfl-info');
const celModeInfo = document.querySelector('.cel-mode');
const fahrModeInfo = document.querySelector('.fahr-mode');

let celMode = true;

celModeInfo.addEventListener('click', ()=>{
    celMode = true;
})

fahrModeInfo.addEventListener('click', ()=>{
    celMode = false;
})

const mainFunc = ()=>{

    if(!inputFind.value){
        alert("Oops! you haven't entered any value.")
    }else{
        async function weatherData(){
            const response = await fetch(
                        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputFind.value}?key=2RKJTWVEYAP5AR2JLV6P837NG`,
                {mode: "cors"},
            );      
            const responseData = await response.json();      
            console.log(responseData);

            const options = dateInfo.options;
            for(let i =0; i<options.length; i++){
                options[i].textContent = responseData.days[i].datetime;
            }

            const displayInfo = ()=>{
               const selectedIndex = options.selectedIndex;
               console.log(selectedIndex);
               function FahrtoCels(Fahr){
                return (Fahr-32)* (5/9);
               };
               mainHeader.textContent = celMode ? `${FahrtoCels(responseData.days[selectedIndex].temp).toFixed(2)}°C`: `${responseData.days[selectedIndex].temp}°F`;
               minTemp.textContent = celMode ? `${FahrtoCels(responseData.days[selectedIndex].tempmin).toFixed(2)}°C`: `${responseData.days[selectedIndex].tempmin}°F`;
               maxTemp.textContent = celMode ? `${FahrtoCels(responseData.days[selectedIndex].tempmax).toFixed(2)}°C`: `${responseData.days[selectedIndex].tempmax}°F`;
               weatherInfo.textContent = responseData.days[selectedIndex].conditions;
               document.querySelector('address').textContent = responseData.resolvedAddress;
               wsInfo.textContent = responseData.days[selectedIndex].windspeed;
               uvInfo.textContent = responseData.days[selectedIndex].uvindex;
               humidityInfo.textContent = responseData.days[selectedIndex].humidity;
               tflInfo.textContent = responseData.days[selectedIndex].feelslike;                
            };

            dateInfo.addEventListener('change', displayInfo);
            displayInfo();             
        }
        weatherData();
    }
};

btnFind.addEventListener('click', mainFunc);
inputFind.addEventListener('submit', mainFunc);
