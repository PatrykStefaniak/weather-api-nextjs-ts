import { ReactNode } from "react";

type CardProps = {
    className?: string
    children: ReactNode
};

export default function Card(props: CardProps) {
    const { className, children } = props;

    return (
        <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
}