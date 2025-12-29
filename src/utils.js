export const utils = (()=>{
    return {
        fahrToCels: (Fahr)=>{
            let Cels = (Fahr - 32) * (5 / 9);
            return `${Cels.toFixed(2)}°C`;
        },
        remainFahr: (Fahr) =>{
            return `${Fahr}°F`;
        }
    }
})();