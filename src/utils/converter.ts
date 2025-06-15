import type {
  AllResults,
  ConversionResult,
  DurationResult,
  ParsedNumber,
  UnixTimeResult,
} from '../types';
import {
  formatDateTime,
  formatDuration,
  formatIEC,
  formatSI,
  formatWithSeparators,
} from './formatter';

export function convertToBasicFormats(parsed: ParsedNumber): ConversionResult {
  if (!parsed.isValid) {
    return {
      binary: 'Invalid',
      decimal: 'Invalid',
      hex: 'Invalid',
      si: 'Invalid',
      iec: 'Invalid',
    };
  }

  const { value } = parsed;

  return {
    binary: `0b${value.toString(2)}`,
    decimal: formatWithSeparators(value),
    hex: `0x${value.toString(16).toUpperCase()}`,
    si: formatSI(value),
    iec: formatIEC(value),
  };
}

export function convertToUnixTime(parsed: ParsedNumber): UnixTimeResult {
  if (!parsed.isValid) {
    const invalid = { local: 'Invalid', utc: 'Invalid' };
    return {
      seconds: invalid,
      milliseconds: invalid,
      microseconds: invalid,
      nanoseconds: invalid,
    };
  }

  const { value } = parsed;

  try {
    const numValue = Number(value);

    if (numValue > Number.MAX_SAFE_INTEGER || numValue < Number.MIN_SAFE_INTEGER) {
      const invalid = { local: 'Out of range', utc: 'Out of range' };
      return {
        seconds: invalid,
        milliseconds: invalid,
        microseconds: invalid,
        nanoseconds: invalid,
      };
    }

    return {
      seconds: {
        local: formatDateTime(numValue * 1000, false),
        utc: formatDateTime(numValue * 1000, true),
      },
      milliseconds: {
        local: formatDateTime(numValue, false),
        utc: formatDateTime(numValue, true),
      },
      microseconds: {
        local: formatDateTime(numValue / 1000, false),
        utc: formatDateTime(numValue / 1000, true),
      },
      nanoseconds: {
        local: formatDateTime(numValue / 1000000, false),
        utc: formatDateTime(numValue / 1000000, true),
      },
    };
  } catch (error) {
    const invalid = { local: 'Error', utc: 'Error' };
    return {
      seconds: invalid,
      milliseconds: invalid,
      microseconds: invalid,
      nanoseconds: invalid,
    };
  }
}

export function convertToDuration(parsed: ParsedNumber): DurationResult {
  if (!parsed.isValid) {
    return {
      seconds: 'Invalid',
      milliseconds: 'Invalid',
      microseconds: 'Invalid',
      nanoseconds: 'Invalid',
    };
  }

  const { value } = parsed;

  try {
    const numValue = Number(value);

    if (numValue > Number.MAX_SAFE_INTEGER || numValue < Number.MIN_SAFE_INTEGER) {
      return {
        seconds: 'Out of range',
        milliseconds: 'Out of range',
        microseconds: 'Out of range',
        nanoseconds: 'Out of range',
      };
    }

    return {
      seconds: formatDuration(numValue),
      milliseconds: formatDuration(numValue / 1000),
      microseconds: formatDuration(numValue / 1000000),
      nanoseconds: formatDuration(numValue / 1000000000),
    };
  } catch (error) {
    return {
      seconds: 'Error',
      milliseconds: 'Error',
      microseconds: 'Error',
      nanoseconds: 'Error',
    };
  }
}

export function convertAll(parsed: ParsedNumber): AllResults {
  return {
    parsed,
    conversions: convertToBasicFormats(parsed),
    unixTime: convertToUnixTime(parsed),
    duration: convertToDuration(parsed),
  };
}
