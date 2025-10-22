import { Forecast, Forecasts } from "@/types/weather";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import { dayOfWeekFromDate } from "@/lib/utils";
import Image from "next/image";
import LoaderMask from "../ui/LoaderMask";

type DailyForecastProps = {
    forecastDays: Forecasts
    isLoading: boolean
};

export default function DailyForecast(props: DailyForecastProps) {
    const { forecastDays, isLoading } = props;

    return (
        <Card>
            <LoaderMask isVisible={isLoading}>
                <div>
                    <CardHeader>
                        {forecastDays.forecastday.length}-Day Forecast
                    </CardHeader>
                    <div>
                        <div className="space-y-3">
                            {forecastDays.forecastday.map((forecast: Forecast, index) => {
                                const day = forecast.day;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className="font-medium text-gray-900 w-28">{dayOfWeekFromDate(new Date(forecast.date))}</span>
                                            <Image
                                                src={"https:" + day.condition.icon}
                                                className="h-6 w-6 text-blue-600"
                                                alt={day.condition.text}
                                                width={24}
                                                height={24}
                                            />
                                            <span className="text-gray-600 flex-1">{day.condition.text}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-600">L: {day.mintemp_c}°</span>
                                            <span className="font-semibold text-gray-900">H: {day.maxtemp_c}°</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </LoaderMask>
        </Card>
    );
}
