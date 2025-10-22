import { Cloud } from "lucide-react";
import Card from "../ui/Card";
import LoaderMask from "../ui/LoaderMask";

type CurrentWeatherProps = {
    name: string
    country: string
    temperature: number
    condition: string
    precipitation: number
    airQuality?: number
    isLoading: boolean
};

export default function CurrentWeather(props: CurrentWeatherProps) {
    const { name, country, temperature, condition, precipitation, airQuality, isLoading } = props;

    return (
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
            <LoaderMask isVisible={isLoading}>
                <div className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">{name + ", " + country}</h2>
                            <p className="text-blue-100 text-lg mb-6">
                                {new Date().toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-7xl font-bold">{temperature}°</div>
                                <div>
                                    <p className="text-xl mb-1">{condition}</p>
                                    <p className="text-blue-100">Precipitation: {precipitation}mm{airQuality ? ", Air Quality: " + airQuality : ""}</p>
                                </div>
                            </div>
                        </div>
                        <Cloud className="h-32 w-32 opacity-30" />
                    </div>
                </div>
            </LoaderMask>
        </Card>
    );
}