import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  name,
  options,
  selectedValue,
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
