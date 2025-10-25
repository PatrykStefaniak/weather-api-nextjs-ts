import { AstronomyResponse, ForecastResponse, FutureHistoryResponse, IpLocationResponse, SearchResponse, TimezoneResponse, WeatherApiError, WeatherResponse } from "@/types/weather";

export const getWeather = async (query: string): Promise<WeatherResponse> => {
    const response = await fetch(`/api/weather?api=current&q=${query}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as WeatherResponse;
};

export const getForecast = async (query: string, days: number): Promise<ForecastResponse> => {
    const response = await fetch(`/api/weather?api=forecast&q=${query}&days=${days}`);
    const json = await response.json();

    if (json.error) {
        throw createError("Error while fetching forecast", json);
    }

    return json as ForecastResponse;
};

export const getFuture = async (query: string, dt: string): Promise<FutureHistoryResponse> => {
    const response = await fetch(`/api/weather?api=future&q=${query}&dt=${dt}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as FutureHistoryResponse;
};

export const getHistory = async (city: string, dt: Date): Promise<FutureHistoryResponse> => {
    const response = await fetch(`/api/weather?api=history&q=${city}&dt=${dt.toISOString().split('T')[0]}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as FutureHistoryResponse;
};

export const getSearch = async (query: string): Promise<SearchResponse> => {
    const response = await fetch(`/api/weather?api=search&q=${query}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as SearchResponse;
};

export const getTimezone = async (city: string): Promise<TimezoneResponse> => {
    const response = await fetch(`/api/weather?api=timezone&q=${city}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as TimezoneResponse;
};

export const getAstronomy = async (city: string, date: Date): Promise<AstronomyResponse> => {
    const response = await fetch(`/api/weather?api=astronomy&q=${city}&dt=${date.toISOString().split('T')[0]}`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as AstronomyResponse;
};

export const getIpLocation = async (): Promise<IpLocationResponse> => {
    const response = await fetch(`/api/ip-location`);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json as IpLocationResponse;
};

const createError = (message: string, json: WeatherApiError) => {
    return new Error(message, {
        cause: json
    });
}

export const getMessageFromError = (error: unknown) => {
    if (!error || !(error instanceof Error)) {
        return String(error);
    } else if (!error.cause) {
        return error.message;
    } else {
        const knownError = error.cause as WeatherApiError;
        return knownError.error.message + " - code " + knownError.error.code
    }
}