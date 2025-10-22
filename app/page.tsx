import Main from '@/components/home/Main';

export default async function Home() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=Seoul&days=14`,
            { next: { revalidate: 3600 } }
        );
        const json = await response.json();

        return <Main defaultWeather={json} />;
    } catch (error) {
        return <Main defaultWeather={null} />;
    }
}