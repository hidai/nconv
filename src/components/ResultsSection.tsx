import { memo } from 'react';
import type { AllResults } from '../types';
import { BasicConversions } from './BasicConversions';
import { DurationTable } from './DurationTable';
import { UnixTimeTable } from './UnixTimeTable';

interface ResultsSectionProps {
  results: AllResults | null;
}

export const ResultsSection = memo(function ResultsSection({ results }: ResultsSectionProps) {
  if (!results) {
    return (
      <div className="results-section">
        <p>Enter a number to see conversions</p>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-grid">
        <BasicConversions conversions={results.conversions} />
        <UnixTimeTable unixTime={results.unixTime} />
        <DurationTable duration={results.duration} />
      </div>
    </div>
  );
});
