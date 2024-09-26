/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactElement, useCallback, ReactNode } from "react";
import { cn } from "../utils/tw-merge";

export interface FormProps {
    onSubmit: (data: Record<string, any>) => void;
    children: ReactNode;
    className?: string;
}

interface InputProps {
    name: string;
    label?: string;
    required?: boolean;
    pattern?: RegExp;
    onInputChange: (name: string, value: any) => void;
    onError: (name: string, error: string) => void;
    error: string;
    isSubmitted: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className = '' }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = useCallback((name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    const handleError = useCallback((name: string, error: string) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const newErrors: Record<string, string> = {};

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.props.name) {
                const { name, required, pattern, label } = child.props;
                const value = formData[name];

                if (required && (!value || value === "")) {
                    newErrors[name] = `${label || name} is required`;
                } else if (pattern && !pattern.test(value)) {
                    newErrors[name] = `${label || name} is not valid`;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit} className={`flex flex-col justify-center items-center shadow-lg p-5 ${className}`}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.props.name) {
                    const inputError = errors[child.props.name] || '';
                    return (
                        <div className="w-full mb-2"> 
                            {React.cloneElement(child as ReactElement<InputProps>, {
                                onInputChange: handleInputChange,
                                onError: handleError,
                                error: inputError,
                                isSubmitted,
                            })}
                            {inputError && <div className="text-red-500 text-xs mt-0">{inputError}</div>} 
                        </div>
                    );
                }
                return child;
            })}

        </form>
    );
};

export default Form;
