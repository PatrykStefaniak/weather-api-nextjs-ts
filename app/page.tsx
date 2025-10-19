'use client';

import CurrentWeather from "@/components/home/CurrentWeather";
import Header from "@/components/home/Header";
import Details from "@/components/home/Details";
import { getWeather } from "@/lib/api";
import { useState } from "react";
import HourlyForecast from "@/components/home/HourlyForecast";
import DailyForecast from "@/components/home/DailyForecast";

export default function Home() {
    const [response, setResponse] = useState<string>('');

    const handleFetch = async (q: string) => {
        const response = await getWeather(q);

        setResponse(JSON.stringify(response));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header handler={handleFetch} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <CurrentWeather
                        location={""}
                        date={""}
                        temperature={0}
                        condition={""}
                        high={0}
                        low={0}
                    />
                    <Details
                        windSpeed={0}
                        humidity={0}
                        visibility={0}
                        pressure={0}
                        uvIndex={0}
                    />
                </div>
                <HourlyForecast hours={[]} />
                <DailyForecast forecastDays={{forecastday: []}} />
            </div>
        </div>
    );
}
