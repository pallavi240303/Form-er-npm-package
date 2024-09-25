
export interface PasswordRequirement {
    label: string;
    regex: RegExp;
  }
  
  export const passwordRequirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'At least one uppercase letter', regex: /[A-Z]/ },
    { label: 'At least one lowercase letter', regex: /[a-z]/ },
    { label: 'At least one number', regex: /\d/ },
    { label: 'At least one special character (!@#$%^&*)', regex: /[!@#$%^&*]/ },
  ];
  
  export const validatePassword = (password: string): {
    allConditionsMet: boolean;
    conditionResults: boolean[];
  } => {
    const conditionResults = passwordRequirements.map(requirement => requirement.regex.test(password));
    const allConditionsMet = conditionResults.every(Boolean);
  
    return { allConditionsMet, conditionResults };
  };
  