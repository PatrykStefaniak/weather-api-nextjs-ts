import { ComponentType } from "react";

type DetailsItemProps = {
    label: string;
    value: string | number;
    icon: ComponentType<{ className?: string }>;
};

export default function DetailsItem(props: DetailsItemProps) {
    const { label, value, icon: Icon } = props;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">{label}</span>
            </div>
            <span className="font-semibold text-gray-900">{value} mph</span>
        </div>
    );
}