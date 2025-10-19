import { Cloud } from "lucide-react";
import { useRef } from "react";

type HeaderProps = {
    handler: (q: string) => Promise<void>
};

export default function Header(props: HeaderProps) {
    const { handler } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = async () => {
        handler(inputRef.current?.value || 'London');
    };

    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Cloud className="h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">WeatherNalsi</h1>
                </div>
                <div className="flex gap-2 w-full max-w-md">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a city..."
                        className="bg-white shadow-sm p-2 rounded-lg flex-1 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white font-semibold"
                        onClick={handleButtonClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
}