import { display } from "./display";
import "./style/main.css";
import { logic } from "./app";
import { utils } from "./utils";

const dateInfo = document.querySelector('.date-info');
const inputFind = document.querySelector('.location-find');

let celMode = true;
let currentData = null;
display.celMode();

const service = (() => {
    const options = dateInfo.options;

    return {
        updateData: function (responseData, bool) {
            const selectedIndex = options.selectedIndex;
            display.updateWeatherInfo(responseData, selectedIndex);
            display.updateAddress(responseData);
            if (bool) {
                display.celMode();
                display.fahrModeReset();
                display.updateTempInfo(utils.fahrToCels, responseData, selectedIndex);
            } else {
                display.fahrMode();
                display.celModeReset();
                display.updateTempInfo(utils.remainFahr, responseData, selectedIndex);
            }
        },
        mainFunc: async function (bool) {
            if (!inputFind.value) {
                display.alertMessage();
            } else {
                const responseData = await logic.response(inputFind.value);
                display.fillDate(responseData);
                currentData = responseData;
                service.updateData(responseData, bool);
            }
        }
    }
})()


dateInfo.addEventListener('change', () => { if (currentData) service.updateData(currentData, celMode) });

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cel-mode')) {
        celMode = true;
        display.celMode();
        display.fahrModeReset();
        if(currentData) service.updateData(currentData, celMode);
    } else if (e.target.classList.contains('fahr-mode')) {
        celMode = false;
        display.fahrMode();
        display.celModeReset();
        if(currentData) service.updateData(currentData, celMode);
    } else if (e.target.classList.contains('btn-find')) { service.mainFunc(celMode) };
});

inputFind.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        service.mainFunc(celMode);
    }
});