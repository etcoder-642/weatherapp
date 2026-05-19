export const logic =  (()=>{
    return {
        response: async function(location) {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.API_KEY}`,
                { mode: "cors" },
            );
            const responseData = await response.json();
            return responseData;
        }
    }
})()