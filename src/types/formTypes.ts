import { ValidationRules } from "../utils/validation";

export interface FormField {
    name: string;
    label: string;
    type: string;
    rules: ValidationRules;
}

export interface FormData {
    [key: string]: string | boolean;
}
