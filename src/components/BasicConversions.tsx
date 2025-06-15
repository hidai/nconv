import { memo } from 'react';
import { ConversionResult } from '../types';

interface BasicConversionsProps {
  conversions: ConversionResult;
}

export const BasicConversions = memo(function BasicConversions({ conversions }: BasicConversionsProps) {
  return (
    <div className="result-group">
      <h3>Basic Conversions</h3>
      <div className="result-row">
        <span className="result-label">Binary:</span>
        <span className="result-value">{conversions.binary}</span>
      </div>
      <div className="result-row">
        <span className="result-label">Decimal:</span>
        <span className="result-value">{conversions.decimal}</span>
      </div>
      <div className="result-row">
        <span className="result-label">Hexadecimal:</span>
        <span className="result-value">{conversions.hex}</span>
      </div>
      <div className="result-row">
        <span className="result-label">SI Units:</span>
        <span className="result-value">{conversions.si}</span>
      </div>
      <div className="result-row">
        <span className="result-label">IEC Units:</span>
        <span className="result-value">{conversions.iec}</span>
      </div>
    </div>
  );
});