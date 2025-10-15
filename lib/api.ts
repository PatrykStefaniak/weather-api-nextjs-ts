export const fetchWeather = async (city: string) => {
    return fetch(`/api/weather?city=${city}`);
};