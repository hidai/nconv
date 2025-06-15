import { memo } from 'react';
import type { ConversionResult } from '../types';
import { CopyableValue } from './CopyableValue';

interface BasicConversionsProps {
  conversions: ConversionResult;
}

export const BasicConversions = memo(function BasicConversions({
  conversions,
}: BasicConversionsProps) {
  return (
    <div className="result-group">
      <h3>Basic Conversions</h3>
      <div className="result-row">
        <span className="result-label">Binary:</span>
        <CopyableValue value={conversions.binary} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">Decimal:</span>
        <CopyableValue value={conversions.decimal} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">Hexadecimal:</span>
        <CopyableValue value={conversions.hex} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">SI Units:</span>
        <CopyableValue value={conversions.si} className="result-value" />
      </div>
      <div className="result-row">
        <span className="result-label">IEC Units:</span>
        <CopyableValue value={conversions.iec} className="result-value" />
      </div>
    </div>
  );
});
