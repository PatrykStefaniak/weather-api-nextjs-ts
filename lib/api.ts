import { AstronomyResponse, ForecastResponse, FutureHistoryResponse, SearchResponse, TimezoneResponse, WeatherResponse } from "@/types/weather";

export const getWeather = async (query: string): Promise<WeatherResponse> => {
    const response = await fetch(`/api/weather?type=current&q=${query}`);
    const json = await response.json();

    return json as WeatherResponse;
};

export const getForecast = async (query: string, days: number): Promise<ForecastResponse> => {
    const response = await fetch(`/api/weather?type=forecast&q=${query}&days=${days}`);
    const json = await response.json();

    return json as ForecastResponse;
};

export const getFuture = async (query: string): Promise<FutureHistoryResponse> => {
    const response = await fetch(`/api/weather?type=future&q=${query}`);
    const json = await response.json();

    return json as FutureHistoryResponse;
};

export const getHistory = async (city: string, date: Date): Promise<FutureHistoryResponse> => {
    const response = await fetch(`/api/weather?type=history&q=${city}&dt=${date.toISOString().split('T')[0]}`);
    const json = await response.json();

    return json as FutureHistoryResponse;
};

export const getSearch = async (query: string): Promise<SearchResponse> => {
    const response = await fetch(`/api/weather?type=search&q=${query}`);
    const json = await response.json();

    return json as SearchResponse;
};

export const getTimezone = async (city: string): Promise<TimezoneResponse> => {
    const response = await fetch(`/api/weather?type=timezone&q=${city}`);
    const json = await response.json();

    return json as TimezoneResponse;
};

export const getAstronomy = async (city: string, date: Date): Promise<AstronomyResponse> => {
    const response = await fetch(`/api/weather?type=astronomy&q=${city}&dt=${date.toISOString().split('T')[0]}`);
    const json = await response.json();

    return json as AstronomyResponse;
};