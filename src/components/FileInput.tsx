import React, { useState } from 'react';

interface InputFileProps {
  name: string;
  label: string;
  onChange: (file: File | null) => void;
  required?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  name,
  label,
  onChange,
  required = false,
}) => {
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (required && !file) {
      setError('File is required.');
      onChange(null); 
    } else {
      setError(''); 
      onChange(file); 
    }
  };

  return (
    <div className="mb-4">
      <label className="block ml-2 mb-2 text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        className={`bg-black p-2 file:rounded-md file:border-none text-white rounded-md file:bg-slate-600 file:text-white ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFile;
