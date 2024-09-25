import React from 'react';

interface SelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (name: string, value: string) => void;
}

const Select: React.FC<SelectProps> = ({ name, label, options, value, onChange }) => {
    return (
        <div className="select">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
