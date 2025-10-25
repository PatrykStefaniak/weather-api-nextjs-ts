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
                                const date = new Date(forecast.date)
                                const dayOfWeek = dayOfWeekFromDate(date);

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-28 flex flex-col text-center">
                                                <span className="font-medium text-gray-900">{dayOfWeek}</span>
                                                <span className="text-gray-900">{date.toLocaleString('default', { day: 'numeric', month: 'long' })}</span>
                                            </div>
                                            <Image
                                                src={"https:" + day.condition.icon}
                                                className="h-8 w-8 text-blue-600"
                                                alt={day.condition.text}
                                                width={32}
                                                height={32}
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
