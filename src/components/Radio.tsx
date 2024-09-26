import React from 'react';
import { cn } from '../utils/tw-merge';

interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  className?:string;
}

const Radio: React.FC<RadioProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  label,
  required = false,
  className
}) => {
  return (
    <div className={cn("mb-4 flex flex-col", className)}>
      <label className="block mb-2 font-semibold">{label} {required && <span className="text-red-500">*</span>}</label>
      {options.map(option => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            required={required}
          />
          <label htmlFor={option.value} className="ml-2">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
