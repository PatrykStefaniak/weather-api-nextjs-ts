'use client';

import CurrentWeather from "@/components/home/CurrentWeather";
import Header from "@/components/home/Header";
import Details from "@/components/home/Details";
import { getForecast, getIpLocation, getMessageFromError } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import HourlyForecast from "@/components/home/HourlyForecast";
import DailyForecast from "@/components/home/DailyForecast";
import { ForecastResponse } from "@/types/weather";
import { useError } from "../context/ErrorProvider";

export default function Main({ defaultWeather }: { defaultWeather: ForecastResponse | null }) {
    const [response, setResponse] = useState<ForecastResponse | null>(defaultWeather);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {addError, removeError} = useError();

    const handleFetch = useCallback(async (q: string) => {
        setIsLoading(true);

        try {
            setResponse(await getForecast(q, 14));
        } catch (error) {
            addError({
                id: 'fetch-error' + Date.now(),
                title: 'Error while fetching forecast',
                message: getMessageFromError(error),
                onClose: removeError
            });
        }

        setIsLoading(false);
    }, [addError, removeError]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const location = await getIpLocation();

                await handleFetch(location.city);
            } catch (error) {
                addError({
                    id: 'fetch-error' + Date.now(),
                    title: 'Error while fetching location',
                    message: getMessageFromError(error),
                    onClose: removeError
                });
            }

            setIsLoading(false);
        })();
    }, [handleFetch, addError, removeError]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header handler={handleFetch} />
                {
                    response && (
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <CurrentWeather
                                    name={response.location.name}
                                    country={response.location.country}
                                    temperature={response.current.temp_c}
                                    condition={response.current.condition.text}
                                    precipitation={response.current.precip_mm}
                                    airQuality={response.current.air_quality?.["us-epa-index"]}
                                    isLoading={isLoading}
                                />
                                <Details
                                    windSpeed={response.current.wind_kph}
                                    humidity={response.current.humidity}
                                    visibility={response.current.vis_km}
                                    pressure={response.current.pressure_mb}
                                    uvIndex={response.current.uv}
                                    isLoading={isLoading}
                                />
                            </div>
                            <HourlyForecast
                                hours={response.forecast.forecastday[0].hour}
                                isLoading={isLoading}
                            />
                            <DailyForecast
                                forecastDays={response.forecast}
                                isLoading={isLoading}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};