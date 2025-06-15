import { memo } from 'react';
import type { DurationResult } from '../types';

interface DurationTableProps {
  duration: DurationResult;
}

export const DurationTable = memo(function DurationTable({ duration }: DurationTableProps) {
  return (
    <div className="result-group">
      <h3>Duration Interpretation</h3>
      <div className="result-row">
        <span className="result-label">as seconds:</span>
        <span className="result-value">{duration.seconds}</span>
      </div>
      <div className="result-row">
        <span className="result-label">as milliseconds:</span>
        <span className="result-value">{duration.milliseconds}</span>
      </div>
      <div className="result-row">
        <span className="result-label">as microseconds:</span>
        <span className="result-value">{duration.microseconds}</span>
      </div>
      <div className="result-row">
        <span className="result-label">as nanoseconds:</span>
        <span className="result-value">{duration.nanoseconds}</span>
      </div>
    </div>
  );
});
