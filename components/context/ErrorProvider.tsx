'use client'

import { createContext, useContext, useState } from "react";
import ErrorWindow, { ErrorWindowProps } from "../ui/ErrorWindow";

type ErrorProviderProps = {
    addError: (cfg: ErrorWindowProps) => void;
    removeError: (id: string) => void;
};

const ErrorContext = createContext<ErrorProviderProps | undefined>(undefined);

export default function ErrorProvider({ children }: { children: React.ReactNode }) {
    const [windows, setWindows] = useState<ErrorWindowProps[]>([]);

    const addError = (cfg: ErrorWindowProps) => {
        const lastWindow = windows[windows.length - 1];
        const { position } = cfg;

        if (lastWindow) {
            if (!position) {
                cfg.position = {
                    x: (lastWindow.position?.x || 0) + 5,
                    y: (lastWindow.position?.y || 0) + 5
                };
            } else {
                if (!position.x) {
                    position.x = (lastWindow.position?.x || 0) + 5;
                }
                if (!position.y) {
                    position.y = (lastWindow.position?.y || 0) + 5;
                }
            }
        }

        setWindows((prev) => [...prev, cfg]);
    };

    const removeError = (id: string) => {
        setWindows((prev) => prev.filter((window) => window.id !== id));
    };

    return (
        <ErrorContext.Provider value={{ addError, removeError }}>
            {
                windows.map((window) => (
                    <ErrorWindow
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        message={window.message}
                        position={window.position}
                        onClose={removeError}
                    />
                ))
            }
            {children}
        </ErrorContext.Provider>
    );
};

export function useError() {
    const ctx = useContext(ErrorContext);

    if (!ctx) {
        throw new Error('useError must be used within ErrorProvider');
    }

    return ctx;
}