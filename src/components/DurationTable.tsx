import { memo } from 'react';
import type { DurationResult } from '../types';
import { CopyableValue } from './CopyableValue';

interface DurationTableProps {
  duration: DurationResult;
}

export const DurationTable = memo(function DurationTable({ duration }: DurationTableProps) {
  return (
    <div className="result-group">
      <h3>Duration Interpretation</h3>
      <div className="result-row">
        <span className="result-label">as seconds:</span>
        <CopyableValue value={duration.seconds} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">as milliseconds:</span>
        <CopyableValue value={duration.milliseconds} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">as microseconds:</span>
        <CopyableValue value={duration.microseconds} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">as nanoseconds:</span>
        <CopyableValue value={duration.nanoseconds} className="result-value" />
      </div>
    </div>
  );
});
