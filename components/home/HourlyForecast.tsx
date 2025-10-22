import { Hour } from "@/types/weather";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import Image from "next/image";
import LoaderMask from "../ui/LoaderMask";

type HourlyForecastProps = {
    hours: Hour[]
    isLoading: boolean
};

export default function HourlyForecast(props: HourlyForecastProps) {
    const { hours, isLoading } = props;

    return (
        <Card className="mb-6">
            <LoaderMask isVisible={isLoading}>
                <CardHeader>
                    Hourly Forecast
                </CardHeader>
                <div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {hours.map((hour: Hour, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    <span className="text-sm font-medium text-gray-600">{hour.time.split(' ')[1]}</span>
                                    <Image
                                        src={"https:" + hour.condition.icon}
                                        className="h-8 w-8 text-blue-600"
                                        alt={hour.condition.text}
                                        width={24}
                                        height={24}
                                    />
                                    <span className="text-lg font-semibold text-gray-900">{hour.temp_c}°</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </LoaderMask>
        </Card>
    );
}