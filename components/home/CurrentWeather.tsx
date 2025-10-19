import { Cloud } from "lucide-react";
import Card from "../ui/Card";

type CurrentWeatherProps = {
    location: string
    date: string
    temperature: number
    condition: string
    high: number
    low: number
};

export default function CurrentWeather(props: CurrentWeatherProps) {
    const { location, date, temperature, condition, high, low } = props;

    return (
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
            <div className="pt-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">{location}</h2>
                        <p className="text-blue-100 text-lg mb-6">{date}</p>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-7xl font-bold">{temperature}°</div>
                            <div>
                                <p className="text-xl mb-1">{condition}</p>
                                <p className="text-blue-100">H: {high}° L: {low}°</p>
                            </div>
                        </div>
                    </div>
                    <Cloud className="h-32 w-32 opacity-30" />
                </div>
            </div>
        </Card>
    );
}