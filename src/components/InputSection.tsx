import { memo } from 'react';

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
  return (
    <div className="input-section">
      <input
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
