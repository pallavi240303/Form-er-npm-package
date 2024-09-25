import React, { useState } from 'react';
import EmailInput from './components/EmailInput'; // Adjust the import path as necessary

const App: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleInputChange = (_name: string, value: string) => {
        setEmail(value);
        setEmailError(null); // Reset error on input change
    };

    const validateEmail = (email: string) => {
        if (!email) {
            return 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return 'Invalid email address';
            }
        }
        return null; // No errors
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
        } else {
            console.log('Form submitted successfully:', { email });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-4">Email Input Demo</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <EmailInput
                    label="Email"
                    hintText="Enter your email"
                    onInputChange={handleInputChange}
                    name="email"
                    required={true}
                    validationRules={undefined} 
                />
                {emailError && <span className="text-red-500 text-xs mt-2">{emailError}</span>}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;
