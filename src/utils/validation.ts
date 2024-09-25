export type ValidationRules = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
};

export const validateField = (name: string, value: string | boolean, rules?: ValidationRules): string | null => {
    if (rules?.required && !value) {
        return `${name} is required.`;
    }
    if (typeof value === 'string') {
        if (rules?.minLength && value.length < rules.minLength) {
            return `${name} must be at least ${rules.minLength} characters.`;
        }
        if (rules?.maxLength && value.length > rules.maxLength) {
            return `${name} must not exceed ${rules.maxLength} characters.`;
        }
        if (rules?.pattern && !rules.pattern.test(value)) {
            return `${name} is invalid.`;
        }
    }
    return null;
};


export const validateInput = (inputValue: string): string | null => {
    const alphabetPattern = /^[A-Za-z]*$/; 
    if (!alphabetPattern.test(inputValue)) {
      return 'Only alphabetic characters are allowed';
    }
    return null;
  };
  
  export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email) ? null : 'Invalid email address';
};
