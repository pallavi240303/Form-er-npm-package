import React, { useState, useEffect } from 'react';
import useDebounce from '../utils/useDebounce';
import { passwordRequirements, validatePassword } from '../utils/passwordValidation';
import { cn } from '../utils/tw-merge';

export interface PasswordProps {
  name: string;
  label: string;
  hintText: string;
  className?: string;
  onInputChange: (name: string, value: string) => void;
  onError: (name: string, error: string) => void;
  isSubmitted: boolean;
  required?: boolean; 
}

const PasswordInput: React.FC<PasswordProps> = ({
  name,
  hintText,
  className = '',
  onInputChange,
  onError,
  label,
  isSubmitted,
  required = false, 
}) => {
  const [state, setState] = useState({
    value: '',
    showTooltip: false,
    isFocused: false,
  });

  const { value, showTooltip, isFocused } = state;
  const debouncedValue = useDebounce(value, 500);
  const { allConditionsMet, conditionResults } = validatePassword(debouncedValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setState(prev => ({ ...prev, value: newValue }));
    onInputChange(name, newValue);
  };

  const handleBlur = () => {
    setState(prev => ({ ...prev, isFocused: false, showTooltip: false }));
    updateErrorState(allConditionsMet);
  };

  const updateErrorState = (isValid: boolean) => {
    if (required && !value.trim()) {
      onError(name, 'Password is required.');
    } else if (!isValid) {
      onError(name, 'Password does not meet requirements');
    } else {
      onError(name, '');
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      updateErrorState(allConditionsMet);
    }
  }, [debouncedValue, isSubmitted, allConditionsMet, name, onError, value, required]);

  return (
    <div className="relative mb-4 text-left">
      <label className="block mb-1 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="password"
        value={value}
        onChange={handleChange}
        placeholder={hintText}
        className={`p-2 border rounded-md transition duration-300 ease-in-out w-full pr-10 
          ${allConditionsMet ? 'border-gray-500' : 'border-gray-300 focus:ring-red-400'} 
          focus:border-blue-500 focus:ring focus:ring-blue-200 ${className}`}
      
      
        onFocus={() => setState(prev => ({ ...prev, isFocused: true }))}
        onBlur={handleBlur}
        required={required}
      />
      {isFocused && (
        <span
          className={`ml-0 text-left absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer ${
            allConditionsMet ? 'text-green-500' : 'text-red-500'
          }`}
          onMouseEnter={() => !allConditionsMet && setState(prev => ({ ...prev, showTooltip: true }))}
          onMouseLeave={() => setState(prev => ({ ...prev, showTooltip: false }))}
        >
          {allConditionsMet ? '✔' : '✘'}
        </span>
      )}
      {!allConditionsMet && showTooltip && (
        <div className="absolute right-10 top-full transform translate-y-2 translate-x-5 bg-white border border-gray-300 outline-offset-1 p-3 rounded shadow-lg z-20">
          <div className="flex flex-col space-y-1">
            {passwordRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center text-sm">
                {conditionResults[index] ? (
                  <span className="text-green-500 mr-2">✔</span>
                ) : (
                  <span className="text-red-500 mr-2">✘</span>
                )}
                <span className={`${
                  conditionResults[index] ? 'text-green-500' : 'text-red-500'
                }`}>
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
