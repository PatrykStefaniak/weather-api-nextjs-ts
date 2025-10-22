import { ReactNode } from "react";

type LoaderProps = {
    isVisible: boolean
    children: ReactNode
};

export default function LoaderMask(props: LoaderProps) {
    const { isVisible } = props;

    return (
        <div className="relative">
            {
                isVisible && (
                    <div className="absolute inset-0 items-center justify-center flex">
                        <div className="w-10 h-10 animate-spin rounded-full border-b-2 border-t-1 border-blue-700"></div>
                    </div>
                )
            }
            <div className={isVisible ? "blur-xs" : ""}>
                {props.children}
            </div>
        </div>
    );
}