export const logic =  (()=>{
    return {
        response: async function(location) {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2RKJTWVEYAP5AR2JLV6P837NG`,
                { mode: "cors" },
            );
            const responseData = await response.json();
            return responseData;
        }
    }
})()