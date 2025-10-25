import Main from '@/components/home/Main';

export default async function Home() {
    let defaultWeather = null;

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=Seoul&days=14`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            defaultWeather = await response.json();
        } else {
            console.error("Error fetching default weather data: ", response.status);
        }
    } catch (error) {
        console.error("Error fetching default weather data: ", error);
    }

    return <Main defaultWeather={defaultWeather} />;
}