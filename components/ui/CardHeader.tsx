import { ReactNode } from "react";

type CardHeaderProps = {
    children: ReactNode
    className?: string
};

export default function CardHeader(props: CardHeaderProps) {
    const { children, className } = props;

    return (
        <div className={`text-xl pb-4 ${className}`}>
            <div className="text-gray-900">
                {children}
            </div>
        </div>
    );
}