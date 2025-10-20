import { ReactNode, useRef, useState, MouseEvent, ChangeEvent, KeyboardEvent } from "react";

type ComboboxProps<T> = {
    items: T[]
    value: string
    handleChange: (value: string) => void
    handleSelect?: (item: string) => void
    renderer?: (item: T) => ReactNode
    getKey?: (item: T, index: number) => string | number
    isLoading?: boolean
};

export default function Combobox<T>(props: ComboboxProps<T>) {
    const { items, handleChange, getKey, renderer, handleSelect, value, isLoading } = props;
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e.currentTarget.value);
    };

    const onSelectItem = (e: MouseEvent<HTMLLIElement>) => {
        handleChange(e.currentTarget.innerText || '');

        setIsOpen(false);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSelect && handleSelect(e.currentTarget.value);
        }
    };

    return (
        <>
            <input
                name="search"
                autoComplete="off"
                className="bg-white shadow-sm p-2 rounded-lg flex-1 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                ref={inputRef}
                value={value}
                onBlur={() => setIsOpen(false)}
                onFocus={() => setIsOpen(true)}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
            />
            {
                isOpen && items.length
                    ? <div
                        style={{pointerEvents: isLoading ? "none" : "auto"}}
                        className={(isLoading ? "opacity-20" : "") + " absolute top-19 rounded-lg bg-white shadow-lg z-10"}
                    >
                        <ul className="max-h-60 p-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                            {items.map((item, index) => (
                                <li
                                    key={getKey ? getKey(item, index) : (item as any).id || index}
                                    className=" rounded-md cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                                    onClick={onSelectItem}
                                >
                                    {renderer ? renderer(item) : (item as any).name || item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    : null
            }
        </>
    );
}