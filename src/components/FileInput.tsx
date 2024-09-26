import React, { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce"; // Ensure this path is correct

export interface FileInputProps {
    label: string;
    name: string;
    required?: boolean;
    acceptedTypes?: string[];
    maxSizeMB?: number;
    onInputChange?: (name: string, value: File | null) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
    label,
    name,
    required = false,
    acceptedTypes = [],
    maxSizeMB = 5,
    onInputChange,
    onError = () => {},
    isSubmitted,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState<string>("");

    // Debounced filename to simulate the delay
    const debouncedFileName = useDebounce(fileName, 1500); // 1.5 seconds delay

    useEffect(() => {
        if (isSubmitted && required && !file) {
            setError(`${label} is required.`);
            onError(name, `${label} is required.`);
        } else {
            setError("");
            onError(name, "");
        }
    }, [isSubmitted, required, file, label, name, onError]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setFile(null);
            setFileName("");
            setError("No file selected.");
            onError(name, "No file selected.");
            return;
        }

        if (acceptedTypes.length && !acceptedTypes.includes(selectedFile.type)) {
            setError(`Invalid file type. Accepted: ${acceptedTypes.join(", ")}`);
            onError(name, `Invalid file type.`);
            return;
        }

        if (maxSizeMB && selectedFile.size / 1024 / 1024 > maxSizeMB) {
            setError(`File size exceeds ${maxSizeMB} MB.`);
            onError(name, `File size exceeds ${maxSizeMB} MB.`);
            return;
        }

        setIsUploading(true); // Indicate file is uploading
        setFile(selectedFile);
        setFileName(selectedFile.name); // Store the filename for debouncing
        onInputChange?.(name, selectedFile);

        // Set uploading to false after the debounce delay
        setTimeout(() => {
            setIsUploading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <input
                id={name}
                type="file"
                onChange={handleFileChange}
                accept={acceptedTypes.join(",")}
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
      file:bg-gray-50 file:border-0
      file:me-4
      file:py-3 file:px-4
      dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
            {isUploading && !debouncedFileName && <div>Uploading...</div>}
            {debouncedFileName && <div>Selected File: {debouncedFileName}</div>}
        </div>
    );
};

export default FileInput;
