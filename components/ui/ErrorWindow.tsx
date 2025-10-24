'use client';

import { useEffect, useRef } from "react";

export type ErrorWindowProps = {
    id: string
    title: string
    message: string
    position?: { x: number; y: number }
    onClose: (id: string) => void
};

export default function ErrorWindow(props: ErrorWindowProps) {
    const { id, title, message, position, onClose } = props;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    let positionStyles = "";

    if (position?.x) {
        positionStyles += `left-${position.x} `;
    }
    if (position?.y) {
        positionStyles += `top-${position.y} `;
    }

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            onClose(id);
        }, 3000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [id, onClose]);

    return (
        <div 
            onClick={() => {onClose(id)}}
            className={`absolute ${positionStyles}bg-red-200 border border-red-600 p-4 rounded shadow-md`}
        >
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}