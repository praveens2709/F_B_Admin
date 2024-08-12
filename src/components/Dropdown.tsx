import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface DropdownItem {
    label: string;
    icon?: IconProp;
}

interface DropdownProps {
    toggle: React.ReactNode;
    title?: string;
    items: DropdownItem[];
    width?: string;
    onItemClick?: (item: DropdownItem) => void;
    children?: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
    toggle,
    title,
    items,
    width = "w-48",
    onItemClick,
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={handleToggle} className="flex items-center space-x-2">
                {toggle}
            </button>
            {isOpen && (
                <div
                    className={`absolute z-50 right-0 mt-2 ${width} bg-white shadow-lg border border-t-4 border-[#FF6F61]`}
                >
                    {children}
                    {title && (
                        <div className="p-2 text-neutral-500 font-semibold text-xs">
                            {title}
                        </div>
                    )}
                    <ul>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className={`p-2 flex items-center hover:bg-orange-50 cursor-pointer text-gray-700 border-b border-[#FF6F61] ${index === items.length - 1 ? 'border-b-0' : ''}`}
                                onClick={() => onItemClick && onItemClick(item)}
                            >
                                {item.icon && (
                                    <FontAwesomeIcon icon={item.icon} size="sm" className="mr-2" />
                                )}
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
