import { ParsedNumber } from '../types';

export function parseNumber(input: string): ParsedNumber {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return {
      value: 0n,
      originalInput: input,
      detectedBase: 10,
      isValid: false,
      error: 'Empty input'
    };
  }

  try {
    let value: bigint;
    let detectedBase: number;

    if (trimmed.toLowerCase().startsWith('0x')) {
      detectedBase = 16;
      value = BigInt(trimmed);
    } else if (trimmed.toLowerCase().startsWith('0b')) {
      detectedBase = 2;
      value = BigInt(trimmed);
    } else if (trimmed.toLowerCase().startsWith('0o')) {
      detectedBase = 8;
      value = BigInt(trimmed);
    } else if (/^-?\d+$/.test(trimmed)) {
      detectedBase = 10;
      value = BigInt(trimmed);
    } else {
      return {
        value: 0n,
        originalInput: input,
        detectedBase: 10,
        isValid: false,
        error: 'Invalid number format'
      };
    }

    return {
      value,
      originalInput: input,
      detectedBase,
      isValid: true
    };
  } catch (error) {
    return {
      value: 0n,
      originalInput: input,
      detectedBase: 10,
      isValid: false,
      error: error instanceof Error ? error.message : 'Parse error'
    };
  }
}