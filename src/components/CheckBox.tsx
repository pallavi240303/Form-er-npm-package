import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxProps {
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  options,
  selectedValues,
  onChange,
  label,
  required = false,
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label} {required && <span className="text-red-500">*</span>}</label>
      {options.map(option => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={option.value} className="ml-2">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
