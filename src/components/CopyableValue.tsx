import { memo, useState } from 'react';

interface CopyableValueProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export const CopyableValue = memo(function CopyableValue({
  value,
  className = '',
  children,
}: CopyableValueProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // Silently handle copy failures in production
      // Consider implementing proper error reporting if needed
    }
  };

  return (
    <>
      <span
        className={`copyable-value ${className}`}
        onClick={handleCopy}
        {...{
          tabIndex: 0,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopy();
          }
        }}
        title="Click to copy"
      >
        {children || value}
      </span>

      {showCopied && <div className="copy-toast">Copied!</div>}
    </>
  );
});
