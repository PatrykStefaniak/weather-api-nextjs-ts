import { Droplets, Eye, Gauge, Sun, Wind } from "lucide-react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import DetailsItem from "./DetailsItem";

type DetailsProps = {
    windSpeed: number;
    humidity: number;
    visibility: number;
    pressure: number;
    uvIndex: number;
};

export default function Details(props: DetailsProps) {
    const { windSpeed, humidity, visibility, pressure, uvIndex } = props;

    return (
        <Card>
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
        </Card>
    );
}