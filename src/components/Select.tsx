import React from 'react';
import { cn } from '../utils/tw-merge';

export interface SelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (name: string, value: string) => void;
    className?: string;
    error?: string; 
}

const Select: React.FC<SelectProps> = ({ 
    name, 
    label, 
    options, 
    value, 
    onChange, 
    className = "", 
    error 
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 font-bold text-gray-700">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out p-2
                    ${error ? 'border-red-500' : 'border-gray-300'} 
                    focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none ${className}`}
                
                aria-invalid={!!error}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Select;
