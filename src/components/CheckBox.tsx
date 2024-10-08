
import React from 'react';
import { cn } from '../utils/tw-merge';

interface CheckboxOption {
    value: string;
    label: string;
}

export interface CheckboxProps {
    name: string;
    options: CheckboxOption[];
    selectedValues: string[];
    onChange: (name: string, value: string) => void;
    label: string;
    className?: string; 
    required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    options,
    selectedValues,
    onChange,
    label,
    required = false,
    className
}) => {
    return (
        <div className={cn('mt-4',className)}>
            <label className="block mb-2 font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {options.map(option => (
                <div key={option.value}>
                    <input
                        type="checkbox"
                        id={option.value}
                        name={name}
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => onChange(name, option.value)}
                    />
                    <label htmlFor={option.value} className="ml-2">{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default Checkbox;
