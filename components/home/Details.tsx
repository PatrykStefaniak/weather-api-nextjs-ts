import { Droplets, Eye, Gauge, Sun, Wind } from "lucide-react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import DetailsItem from "./DetailsItem";
import LoaderMask from "../ui/LoaderMask";

type DetailsProps = {
    windSpeed: number
    humidity: number
    visibility: number
    pressure: number
    uvIndex: number
    isLoading: boolean
};

export default function Details(props: DetailsProps) {
    const { windSpeed, humidity, visibility, pressure, uvIndex, isLoading } = props;

    return (
        <Card>
            <LoaderMask isVisible={isLoading}>
                <CardHeader>
                    Weather Details
                </CardHeader>
                <div className="space-y-4">
                    <DetailsItem
                        icon={Wind}
                        label="Wind"
                        value={windSpeed + " mph"}
                    />
                    <DetailsItem
                        icon={Droplets}
                        label="Humidity"
                        value={humidity + "%"}
                    />
                    <DetailsItem
                        icon={Eye}
                        label="Visibility"
                        value={visibility + " mi"}
                    />
                    <DetailsItem
                        icon={Gauge}
                        label="Pressure"
                        value={pressure + " in"}
                    />
                    <DetailsItem
                        icon={Sun}
                        label="UV Index"
                        value={uvIndex}
                    />
                </div>
            </LoaderMask>
        </Card>
    );
}