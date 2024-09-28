# @pk2420/formz

A collection of reusable React components, including buttons, radio buttons, checkboxes, input fields, Select and forms. This package provides form elements that integrate well with TypeScript and offer flexibility for handling validation, input changes, and submission in React applications.
## Table of Contents

-   [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
   - [Button](#button)
   - [CheckBox](#checkbox)
   - [ConfirmPassword](#confirmpassword)
   - [EmailInput](#emailinput)
   - [ErrorMessage](#errormessage)
   - [FileInput](#fileinput)
   - [Form](#form)
   - [PasswordInput](#passwordinput)
   - [Radio](#radio)
   - [Select](#select)
   - [TextInput](#textinput)



## Installation

You can install the package using **npm**  :

```bash
npm install @pk2420/formz
```


## Usage

```react
   import { Button, ConfirmPassword, EmailInput, Form, CheckBox, FileInput, PasswordInput, Select, TextInput } from '@pk2420/formz';
import React, { useState } from 'react';
import "@pk2420/formz/dist/index.css";

const App = () => {
    const [formData, setFormData] = useState<{
        email: string; 
        password: string; 
        selectedOptions: string[]; 
        selectedFile: File | null; 
        selectedValue: string;
    }>({
        email: '',
        password: '',
        selectedOptions: [],
        selectedFile: null,
        selectedValue: '',
    });

    const handleChange = (name: string, value: any) => {
        setFormData(prevState => {
            if (Array.isArray(prevState.selectedOptions)) {
                const selectedOptions = prevState.selectedOptions.includes(value)
                    ? prevState.selectedOptions.filter(option => option !== value)
                    : [...prevState.selectedOptions, value];
                
                return { ...prevState, selectedOptions };
            }

            if (name === 'fileInput') {
                return { ...prevState, selectedFile: value };
            }

            return { ...prevState, [name]: value };
        });
    };

    const handleSubmit = (data: Record<string, any>) => {
        console.log("Form Submitted:", data);
    };

    const Options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

    return (
        <div className='w-full flex justify-center items-center'>
            <Form onSubmit={handleSubmit} className='w-2/4'>
                <TextInput
                    name='secret'
                    label='TOP SECRET'
                    hintText='Feel free to share any stuff'
                    onInputChange={handleChange}
                    className='w-full'
                />
                <EmailInput
                    label="Email Address"
                    hintText="Enter your email"
                    name="email"
                    onInputChange={handleChange}
                    required={true}
                    className='w-full'
                />
                <PasswordInput
                    name='password'
                    label='Old Password'
                    hintText='Enter your old Password'
                    required={true}
                    onInputChange={handleChange}
                    isSubmitted={false} 
                    onError={() => {}} 
                />
                <ConfirmPassword
                    name="password"
                    label="Password"
                    hintText="Enter your password"
                    required={true}
                    onInputChange={handleChange}
                    onError={() => {}}
                    isSubmitted={false}
                    className='w-full'
                />
                <CheckBox
                    name="checkboxOptions"
                    options={Options}
                    selectedValues={formData.selectedOptions}
                    onChange={(name, value) => handleChange(name, value)}
                    label="Select Options"
                    required={false}
                />
                <FileInput
                    label="Upload File"
                    name="fileInput"
                    required={true}
                    onInputChange={(name, value) => handleChange(name, value)}
                    onError={() => {}}
                />
                <Select
                    name="selectInput"
                    label="Select an Option"
                    options={Options}
                    value={formData.selectedValue}
                    onChange={(name, value) => handleChange(name, value)}
                    className="w-full p-2 "
                    error={''}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    );
};

export default App;
             


```
## Components

### Button

A customizable button component.

**Props:**
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - Optional function for handling click events.
- `type?: 'button' | 'submit' | 'reset'` - Specifies the button type (`button`, `submit`, or `reset`).
- `disabled?: boolean` - Boolean flag to disable the button.
- `className?: string` - Additional CSS classes for styling.
- `children: React.ReactNode` - Content to be displayed inside the button.

---

### CheckBox

A component for selecting multiple options from a list.

**Props:**
- `name: string` - Name of the checkbox group.
- `options: CheckboxOption[]` - Array of options with `value` and `label`.
- `selectedValues: string[]` - Array of selected values.
- `onChange: (name: string, value: string) => void` - Function called when an option is selected/deselected.
- `label: string` - Label displayed above the checkbox group.
- `className?: string` - Additional CSS classes for styling.
- `required?: boolean` - Boolean indicating if at least one option must be selected.

---

### ConfirmPassword

A component for confirming a password entry.

**Props:**
- `name: string` - Name of the password field.
- `label: string` - Label for the password field.
- `hintText: string` - Hint text displayed below the field.
- `className?: string` - Additional CSS classes for styling.
- `onInputChange: (name: string, value: string) => void` - Function called when the input changes.
- `onError: (name: string, error: string) => void` - Function called when an error occurs.
- `isSubmitted: boolean` - Boolean indicating if the form has been submitted.
- `required?: boolean` - Boolean indicating if the field is required.

---

### EmailInput

An input component for entering email addresses.

**Props:**
- `label: string` - Label for the email input.
- `hintText: string` - Hint text displayed below the field.
- `className?: string` - Additional CSS classes for styling.
- `onInputChange: (name: string, value: string) => void` - Function called when the input changes.
- `name: string` - Name of the input field.
- `required?: boolean` - Boolean indicating if the field is required.
- `validationRules?: ValidationRules` - Object defining validation rules (e.g., `required`, `minLength`, `pattern`).

---

### ErrorMessage

A component for displaying error messages.

**Props:**
- `message: string` - Error message text to be displayed.

---

### FileInput

An input component for uploading files.

**Props:**
- `label: string` - Label for the file input.
- `name: string` - Name of the input field.
- `required?: boolean` - Boolean indicating if the file input is required.
- `acceptedTypes?: string[]` - Array of accepted file types.
- `maxSizeMB?: number` - Maximum file size in megabytes.
- `onInputChange?: (name: string, value: File | null) => void` - Function called when a file is selected.
- `onError?: (name: string, error: string) => void` - Function called when an error occurs.
- `isSubmitted?: boolean` - Boolean indicating if the form has been submitted.

---

### Form

A component for managing form submissions.

**Props:**
- `onSubmit: (data: Record<string, any>) => void` - Function called when the form is submitted.
- `children: ReactNode` - Child components rendered inside the form.
- `className?: string` - Additional CSS classes for styling.

---

### PasswordInput

An input component for entering passwords.

**Props:**
- `name: string` - Name of the password field.
- `label: string` - Label for the password input.
- `hintText: string` - Hint text displayed below the field.
- `className?: string` - Additional CSS classes for styling.
- `onInputChange: (name: string, value: string) => void` - Function called when the input changes.
- `onError: (name: string, error: string) => void` - Function called when an error occurs.
- `isSubmitted: boolean` - Boolean indicating if the form has been submitted.
- `required?: boolean` - Boolean indicating if the field is required.

---

### Radio

A component for selecting a single option from a list of radio buttons.

**Props:**
- `name: string` - Name of the radio group.
- `options: RadioOption[]` - Array of options with `value` and `label`.
- `selectedValue: string` - The currently selected value.
- `onChange: (name: string, value: string) => void` - Function called when an option is selected.
- `label: string` - Label displayed above the radio group.
- `required?: boolean` - Boolean indicating if an option must be selected.
- `className?: string` - Additional CSS classes for styling.

---

### Select

A dropdown component for selecting a single option.

**Props:**
- `name: string` - Name of the select input.
- `label: string` - Label for the select input.
- `options: { value: string; label: string; }[]` - Array of options with `value` and `label`.
- `value: string` - Currently selected value.
- `onChange: (name: string, value: string) => void` - Function called when an option is selected.
- `className?: string` - Additional CSS classes for styling.
- `error?: string` - Error message to display below the select input.

---

### TextInput

An input component for entering text.

**Props:**
- `label: string` - Label for the text input.
- `hintText: string` - Hint text displayed below the field.
- `className?: string` - Additional CSS classes for styling.
- `onInputChange: (name: string, value: string) => void` - Function called when the input changes.
- `name: string` - Name of the input field.
- `required?: boolean` - Boolean indicating if the field is required.
- `validationRules?: ValidationRules` - Object defining validation rules (e.g., `required`, `minLength`, `maxLength`, `pattern`).

---


## License

[MIT](https://choosealicense.com/licenses/mit/)
