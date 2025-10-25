import { Hour } from "@/types/weather";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import Image from "next/image";
import LoaderMask from "../ui/LoaderMask";
import { useEffect, useRef } from "react";

type HourlyForecastProps = {
    hours: Hour[]
    isLoading: boolean
    localTime: string
};

export default function HourlyForecast(props: HourlyForecastProps) {
    const { hours, isLoading, localTime } = props;
    const currentHourRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        currentHourRef.current?.scrollIntoView({ behavior: 'smooth', inline: "start", block: "nearest" });
    }, [hours]);

    return (
        <Card className="mb-6">
            <LoaderMask isVisible={isLoading}>
                <CardHeader>
                    Hourly Forecast
                </CardHeader>
                <div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {
                            (() => {
                                const localDate = new Date(localTime);
                                const localDay = localDate.getDate();
                                const localMonth = localDate.getMonth();
                                const localHour = localDate.getHours();

                                return hours.map((hourObj: Hour, index) => {
                                    const time = hourObj.time;
                                    const split = time.split(' ');
                                    const date = new Date(time);
                                    const isCurrent = localDay == date.getDate() &&
                                        localMonth == date.getMonth() &&
                                        localHour == date.getHours();

                                    return (
                                        <div
                                            ref={isCurrent ? currentHourRef : null}
                                            key={index}
                                            className={(isCurrent ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-blue-50")
                                                + " flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg transition-colors"}
                                        >
                                            <div className="flex flex-col-reverse flex-1 text-sm font-medium text-gray-600">
                                                <div>{split[1]}</div>
                                                <div>{split[1] == '00:00' ? split[0].substring(5) : " "}</div>
                                            </div>
                                            <Image
                                                src={"https:" + hourObj.condition.icon}
                                                className="h-8 w-8 text-blue-600"
                                                alt={hourObj.condition.text}
                                                width={32}
                                                height={32}
                                            />
                                            <span className="text-lg font-semibold text-gray-900">{hourObj.temp_c}°</span>
                                        </div>
                                    );
                                })
                            })()
                        }
                    </div>
                </div>
            </LoaderMask>
        </Card>
    );
}