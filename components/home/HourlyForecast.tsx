import { Hour } from "@/types/weather";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import Image from "next/image";
import LoaderMask from "../ui/LoaderMask";
import { useEffect, useRef } from "react";

type HourlyForecastProps = {
    hours: Hour[]
    isLoading: boolean
};

export default function HourlyForecast(props: HourlyForecastProps) {
    const { hours, isLoading } = props;
    const currentHourRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        currentHourRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, []);

    return (
        <Card className="mb-6">
            <LoaderMask isVisible={isLoading}>
                <CardHeader>
                    Hourly Forecast
                </CardHeader>
                <div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {
                            hours.map((hourObj: Hour, index) => {
                                const currentHour = new Date().getHours();
                                const hour = new Date(hourObj.time).getHours();
                                const isCurrent = hour === currentHour

                                return (
                                    <div
                                        ref={isCurrent ? currentHourRef : null}
                                        key={index}
                                        className={(isCurrent ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-blue-50")
                                            + " flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg transition-colors"}
                                    >
                                        <span className="text-sm font-medium text-gray-600">{hourObj.time.split(' ')[1]}</span>
                                        <Image
                                            src={"https:" + hourObj.condition.icon}
                                            className="h-8 w-8 text-blue-600"
                                            alt={hourObj.condition.text}
                                            width={24}
                                            height={24}
                                        />
                                        <span className="text-lg font-semibold text-gray-900">{hourObj.temp_c}°</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </LoaderMask>
        </Card>
    );
}