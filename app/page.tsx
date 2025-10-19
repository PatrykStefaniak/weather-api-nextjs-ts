'use client';

import { getFuture, getWeather } from "@/lib/api";
import { Cloud, Droplets, Eye, Gauge, Sun, Wind } from "lucide-react";
import { useState, useRef } from "react";

export default function Home() {
    const [response, setResponse] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFetch = async () => {
        const response = await getWeather(inputRef.current?.value || 'London');
        // const response = await getFuture(inputRef.current?.value || 'London');
        setResponse(JSON.stringify(response));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
                            {response}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                                className="bg-white shadow-sm"
                            />
                            <button
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={handleFetch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
                        <div className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">location</h2>
                                    <p className="text-blue-100 text-lg mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-7xl font-bold">temperature°</div>
                                        <div>
                                            <p className="text-xl mb-1">condition</p>
                                            <p className="text-blue-100">H: high° L: low°</p>
                                        </div>
                                    </div>
                                </div>
                                <Cloud className="h-32 w-32 opacity-30" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg">
                        <div>
                            <div className="text-gray-900">Weather Details</div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Wind className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600">Wind</span>
                                </div>
                                <span className="font-semibold text-gray-900">windSpeed mph</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600">Humidity</span>
                                </div>
                                <span className="font-semibold text-gray-900">humidity%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Eye className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600">Visibility</span>
                                </div>
                                <span className="font-semibold text-gray-900">visibility mi</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Gauge className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600">Pressure</span>
                                </div>
                                <span className="font-semibold text-gray-900">pressure in</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sun className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-600">UV Index</span>
                                </div>
                                <span className="font-semibold text-gray-900">uvIndex</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-6 bg-white shadow-lg">
                    <div>
                        <div className="text-gray-900">Hourly Forecast</div>
                    </div>
                    <div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                        {[].map((hour: any, index) => {
                            const Icon = hour.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    <span className="text-sm font-medium text-gray-600">{hour.time}</span>
                                    <Icon className="h-8 w-8 text-blue-600" />
                                    <span className="text-lg font-semibold text-gray-900">{hour.temp}°</span>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-lg">
                    <div>
                        <div className="text-gray-900">X-Day Forecast</div>
                    </div>
                    <div>
                        <div className="space-y-3">
                            {[].map((day: any, index) => {
                                const Icon = day.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className="font-medium text-gray-900 w-28">{day.day}</span>
                                            <Icon className="h-6 w-6 text-blue-600" />
                                            <span className="text-gray-600 flex-1">{day.condition}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-600">L: {day.low}°</span>
                                            <span className="font-semibold text-gray-900">H: {day.high}°</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
