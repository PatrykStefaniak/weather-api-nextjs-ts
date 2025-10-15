'use client';

import { fetchWeather } from "@/lib/api";
import { useState, useRef } from "react";

export default function Home() {
    const [response, setResponse] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFetch = async () => {
        const response = await fetchWeather(inputRef.current?.value || 'London');
        const json = await response.json();
        setResponse(JSON.stringify(json));
    };

    return <>
        <h1>My weather app</h1>
        <input ref={inputRef} />
        <button onClick={handleFetch}>Fetch</button>
        <div>{response}</div>
    </>;
}
