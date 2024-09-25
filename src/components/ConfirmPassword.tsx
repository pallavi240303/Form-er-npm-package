import React, { useState, useEffect } from 'react';
import useDebounce from '../utils/useDebounce';
import { passwordRequirements, validatePassword } from '../utils/passwordValidation';

interface PasswordProps {
  name: string;
  label: string;
  hintText: string;
  className?: string;
  onInputChange: (name: string, value: string) => void;
  onError: (name: string, error: string) => void;
  isSubmitted: boolean;
  required?: boolean; // Add required prop
}

const PasswordInput: React.FC<PasswordProps> = ({
  name,
  hintText,
  className = '',
  onInputChange,
  onError,
  label,
  isSubmitted,
  required = false, // Default to false if not provided
}) => {
  const [state, setState] = useState({
    value: '',
    confirmValue: '',
    showTooltip: false,
    isFocused: false,
    isConfirmFocused: false, // Added state for confirm password focus
  });

  const { value, confirmValue, showTooltip, isFocused, isConfirmFocused } = state;
  const debouncedValue = useDebounce(value, 500);
  const debouncedConfirmValue = useDebounce(confirmValue, 500);
  const { allConditionsMet, conditionResults } = validatePassword(debouncedValue);
  const passwordsMatch = debouncedValue === debouncedConfirmValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement; // Ensuring it is treated as an HTMLInputElement
  const newValue = target.value;
    setState(prev => ({ ...prev, value: newValue }));
    onInputChange(name, newValue);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setState(prev => ({ ...prev, confirmValue: newValue }));
  };

  const handleBlur = () => {
    setState(prev => ({ ...prev, isFocused: false, showTooltip: false }));
    updateErrorState(allConditionsMet);
  };

  const handleConfirmBlur = () => {
    setState(prev => ({ ...prev, isConfirmFocused: false }));
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
    <div className="mb-4 text-left">
      {/* Password Input */}
      <div className="relative mb-4">
        <label className="block mb-1 font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="password"
          value={value}
          onChange={handleChange}
          placeholder={hintText}
          className={`p-2 border rounded-md transition duration-300 ease-in-out w-full pr-10 ${className} ${
            allConditionsMet ? 'border-gray-500' : 'border-gray-300 focus:ring-red-400'
          } focus:border-blue-500 focus:ring focus:ring-blue-200`}
          onFocus={() => setState(prev => ({ ...prev, isFocused: true }))}
          onBlur={handleBlur}
          required={required} // Set required attribute on the input element
        />
        {isFocused && (
          <span
            className={`absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer ${
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

      {/* Confirm Password Input */}
      <div className="relative mb-4">
        <label className="block mb-1 font-semibold">
          Confirm Password {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="password"
          value={confirmValue}
          onChange={handleConfirmChange}
          placeholder="Confirm your password"
          className={`p-2 border rounded-md transition duration-300 ease-in-out w-full pr-10 ${
            isConfirmFocused ? (passwordsMatch ? 'border-gray-500' : 'border-gray-300 focus:ring-red-400') : 'border-gray-300'
          } focus:border-blue-500 focus:ring focus:ring-blue-200`}
          onFocus={() => setState(prev => ({ ...prev, isConfirmFocused: true }))}
          onBlur={handleConfirmBlur}
        />
        {isConfirmFocused && confirmValue.length > 0  &&(
          <span
            className={`absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer ${
              passwordsMatch && confirmValue!= null ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {passwordsMatch ? '✔' : '✘'}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
