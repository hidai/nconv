import { memo, useEffect, useRef } from 'react';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const InputSection = memo(function InputSection({
  value,
  onChange,
  error,
}: InputSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="input-section">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a number (e.g., 42, 0xFF, 0b1010)"
        className={`number-input ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
});
