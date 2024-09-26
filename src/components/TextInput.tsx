import React, { useState, useEffect } from 'react';
import useDebounce from '../utils/useDebounce';
import { validateField, validateInput, ValidationRules } from '../utils/validation';
import { cn } from '../utils/tw-merge';

export interface TextInputProps {
    label: string;
    hintText: string;
    className?: string;
    onInputChange: (name: string, value: string) => void; 
    name: string; 
    required?: boolean;
    validationRules?: ValidationRules; 
}

interface InputState {
    value: string;
    error: string | null;
}

const TextInput: React.FC<TextInputProps> = ({
    hintText,
    className,
    onInputChange,
    name,
    required,
    label,
    validationRules,
}) => {
    const [inputState, setInputState] = useState<InputState>({ value: '', error: null });
    const debouncedValue = useDebounce(inputState.value, 300); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputState(prevState => ({ ...prevState, value: inputValue }));
        onInputChange(name, inputValue);
    };

    useEffect(() => {
        const validationError = validateField(name, debouncedValue, validationRules) || validateInput(debouncedValue);
        setInputState(prevState => ({ ...prevState, error: validationError }));
    }, [debouncedValue, name, validationRules]);

    return (
        <div className="relative mb-4 flex-col items-start text-left ">
            <label className={`block mb-1 font-semibold`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className='flex-col'>
                <input
                    type="text"
                    value={inputState.value}
                    onChange={handleChange}
                    placeholder={hintText}
                    className={`p-2 border rounded-md transition duration-300 ease-in-out 
                        ${className} 
                        ${inputState.error ? 'border-red-500 focus:ring focus:ring-red-600' : 'border-gray-500'} 
                        focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    
                    
                />
                <div>
                {inputState.error && <span className="text-red-500 text-xs mt-2">{inputState.error}</span>}
                </div>
            </div>
        </div>
    );
};

export default TextInput;
