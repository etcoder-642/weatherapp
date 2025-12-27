# 🌦️ Weather App — Full Documentation

## Overview

This Weather App is a client-side JavaScript application that allows users to:

* Search for a city or location by name
* Fetch real-time and forecast weather data from the **Visual Crossing Weather API**
* View weather conditions for multiple days
* Switch between **Celsius** and **Fahrenheit**
* Dynamically update weather details based on user-selected dates

The app is built using:

* **Vanilla JavaScript** (DOM manipulation + async API calls)
* **HTML** for structure
* **CSS** for layout and styling

No frameworks are used. All logic runs entirely in the browser.

---

## Project Structure

```
├── index.html
├── index.js
└── style/
    └── main.css
```

---

## index.js — JavaScript Logic

### Imported Files

```js
import "./style/main.css"
```

* Imports the main CSS file so the bundler (e.g. Webpack / Vite) can include it.
* No JavaScript logic exists inside CSS; this is purely for styling.

---

## DOM Element References

The app starts by querying and storing references to DOM elements.
Each constant maps directly to an element in `index.html`.

```js
const btnFind = document.querySelector('.btn-find');
```

* **Search button**
* Triggers the weather lookup process

```js
const inputFind = document.querySelector('.location-find');
```

* **Text input**
* Accepts city or location name (e.g., `London`, `Addis Ababa`)

```js
const mainHeader = document.querySelector('.main-header');
```

* Displays the **main temperature value** (large text)

```js
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
```

* Display minimum and maximum temperatures for the selected day

```js
const weatherInfo = document.querySelector('.weather-info');
```

* Shows weather condition text (e.g. `Partially Cloudy`)

```js
const dateInfo = document.querySelector('.date-info');
```

* `<select>` dropdown for choosing forecast dates

```js
const wsInfo = document.querySelector('.ws-info');
```

* Displays wind speed

```js
const uvInfo = document.querySelector('.uv-info');
```

* Displays UV index

```js
const humidityInfo = document.querySelector('.humidity-info');
```

* Displays humidity percentage

```js
const tflInfo = document.querySelector('.tfl-info');
```

* Displays “feels like” temperature

```js
const celModeInfo = document.querySelector('.cel-mode');
const fahrModeInfo = document.querySelector('.fahr-mode');
```

* Buttons that toggle temperature units

---

## Global State Variables

```js
let celMode = true;
```

* Boolean flag that controls temperature units
* `true` → Celsius
* `false` → Fahrenheit
* This variable affects *all* temperature calculations and displays

---

## Temperature Mode Event Handlers

```js
celModeInfo.addEventListener('click', ()=>{
    celMode = true;
})
```

* Activates **Celsius mode**
* Does not immediately update UI
* UI updates occur only when `displayInfo()` runs

```js
fahrModeInfo.addEventListener('click', ()=>{
    celMode = false;
})
```

* Activates **Fahrenheit mode**
* Same behavior as above

---

## mainFunc — Core Application Controller

```js
const mainFunc = ()=>{
```

This function acts as the **central controller** of the app.
It is triggered when:

* The user clicks the **Search** button
* The user submits the input (intended behavior)

---

### Step 1: Input Validation

```js
if(!inputFind.value){
    alert("Oops! you haven't entered any value.")
}
```

* Prevents API calls when input is empty
* Alerts the user immediately
* Stops execution early

---

### Step 2: Fetching Weather Data

If input is valid:

```js
async function weatherData(){
```

This inner async function:

* Fetches weather data
* Parses JSON
* Updates the UI

---

#### API Request

```js
const response = await fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputFind.value}?key=YOUR_API_KEY`,
  {mode: "cors"}
);
```

* Requests timeline-based weather data
* Uses user-provided location
* Returns multiple days of forecast data

---

#### Parsing Response

```js
const responseData = await response.json();
```

* Converts API response to usable JavaScript object
* Structure includes:

  * `resolvedAddress`
  * `days[]`
  * Weather metrics per day

---

### Step 3: Populating Date Selector

```js
const options = dateInfo.options;
```

* Retrieves all `<option>` elements inside the date selector

```js
for(let i =0; i<options.length; i++){
    options[i].textContent = responseData.days[i].datetime;
}
```

* Maps API forecast dates to dropdown options
* Each option corresponds to a specific day’s weather

---

## displayInfo — UI Renderer

```js
const displayInfo = ()=>{
```

This function:

* Reads the currently selected date
* Converts temperature if needed
* Updates *all* UI fields

---

### Selected Date Logic

```js
const selectedIndex = options.selectedIndex;
```

* Determines which forecast day is active

---

### Temperature Conversion Helper

```js
function FahrtoCels(Fahr){
    return (Fahr-32)* (5/9);
}
```

* Converts Fahrenheit → Celsius
* Used conditionally based on `celMode`

---

### Temperature Display

```js
mainHeader.textContent = celMode 
  ? `${FahrtoCels(responseData.days[selectedIndex].temp).toFixed(2)}°C`
  : `${responseData.days[selectedIndex].temp}°F`;
```

Same logic applies to:

* Minimum temperature
* Maximum temperature

---

### Other Weather Details

```js
weatherInfo.textContent = responseData.days[selectedIndex].conditions;
```

```js
document.querySelector('address').textContent = responseData.resolvedAddress;
```

```js
wsInfo.textContent = responseData.days[selectedIndex].windspeed;
uvInfo.textContent = responseData.days[selectedIndex].uvindex;
humidityInfo.textContent = responseData.days[selectedIndex].humidity;
tflInfo.textContent = responseData.days[selectedIndex].feelslike;
```

Each UI element directly reflects the selected day's data.

---

### Date Change Listener

```js
dateInfo.addEventListener('change', displayInfo);
```

* Automatically updates UI when user selects a different date

```js
displayInfo();
```

* Ensures the UI updates immediately after fetching data

---

## Event Listeners

```js
btnFind.addEventListener('click', mainFunc);
```

* Primary trigger for weather lookup

```js
inputFind.addEventListener('submit', mainFunc);
```

* Intended to allow Enter key submission
* (Note: inputs don’t emit `submit` events unless wrapped in a `<form>`)

---

## Case Scenarios — How the App Behaves

### Scenario 1: User Searches for "London"

1. User types `London`
2. Clicks **Search**
3. API request is sent
4. Date dropdown fills with forecast dates
5. Weather data for the first date is displayed
6. User switches dates → UI updates instantly
7. User toggles Celsius/Fahrenheit → temperatures recalculate

---

### Scenario 2: User Clicks Search with Empty Input

1. Input field is empty
2. User clicks **Search**
3. Alert appears:

   ```
   Oops! you haven't entered any value.
   ```
4. No API call is made

---

### Scenario 3: User Changes Date After Search

1. Weather data already loaded
2. User selects a different date
3. `displayInfo()` runs
4. All values update without refetching data

---

### Scenario 4: User Switches Temperature Mode

1. User clicks **Fahrenheit**
2. `celMode` becomes `false`
3. UI updates only on next `displayInfo()` call
4. Date change or re-search triggers new values

---

## Known Limitations

* No error handling for invalid city names
* API key is exposed in frontend code
* Temperature unit switch does not auto-refresh UI
* `submit` listener on input is ineffective without a form

---

## Conclusion

This app demonstrates:

* Clean DOM-driven architecture
* Practical async API usage
* Clear separation between data fetching and UI rendering
* Real-world weather data integration without frameworks

It is a solid foundation for:

* Error handling
* Unit persistence
* UI animations
* Backend API proxying