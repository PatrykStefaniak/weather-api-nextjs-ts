import { getSearch } from "@/lib/api";
import { Cloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Combobox from "../ui/Combobox";
import { Search } from "@/types/weather";

type HeaderProps = {
    handler: (q: string) => Promise<void>
};

export default function Header(props: HeaderProps) {
    const { handler } = props;
    const [cities, setCities] = useState<Search[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedRef = useRef<NodeJS.Timeout | null>(null);

    const handleSelect = (city: string) => {
        handler(city);
    }

    const handleSearchCity = (city: string, isSelected?: boolean) => {
        setSearch(city);

        if (isSelected) {
            return handler(search);
        }

        setIsLoading(true);

        if (debouncedRef.current) {
            clearTimeout(debouncedRef.current);
            debouncedRef.current = null;
        }

        if (city === "") {
            setIsLoading(false);
            return setCities([]);
        }

        debouncedRef.current = setTimeout(async () => {
            setCities(await getSearch(city));
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (debouncedRef.current) {
                clearTimeout(debouncedRef.current);
            }
        };
    }, []);

    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Cloud className="h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">WeatherNalsi</h1>
                </div>
                <div className="flex gap-2 max-w-sm w-full">
                    <Combobox<Search>
                        getKey={(item: Search) => item.id}
                        value={search}
                        handleChange={handleSearchCity}
                        items={cities}
                        renderer={(item: Search) => item.name + (item.region ? ", " + item.region : "") + ", " + item.country}
                        handleSelect={handleSelect}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </header>
    );
}