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
  isTimestampValid,
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
    const invalid = { local: 'Invalid', utc: 'Invalid', isValid: false };
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

    // Skip MAX_SAFE_INTEGER check for very large values that might be nanosecond timestamps
    // We'll handle precision loss in the conversion, but allow the calculation to proceed
    if (numValue === Infinity || numValue === -Infinity || isNaN(numValue)) {
      const invalid = { local: 'Out of range', utc: 'Out of range', isValid: false };
      return {
        seconds: invalid,
        milliseconds: invalid,
        microseconds: invalid,
        nanoseconds: invalid,
      };
    }

    const secondsTimestamp = numValue * 1000;
    const millisecondsTimestamp = numValue;
    const microsecondsTimestamp = numValue / 1000;
    const nanosecondsTimestamp = numValue / 1000000;

    return {
      seconds: {
        local: formatDateTime(secondsTimestamp, false),
        utc: formatDateTime(secondsTimestamp, true),
        isValid: isTimestampValid(secondsTimestamp),
      },
      milliseconds: {
        local: formatDateTime(millisecondsTimestamp, false),
        utc: formatDateTime(millisecondsTimestamp, true),
        isValid: isTimestampValid(millisecondsTimestamp),
      },
      microseconds: {
        local: formatDateTime(microsecondsTimestamp, false),
        utc: formatDateTime(microsecondsTimestamp, true),
        isValid: isTimestampValid(microsecondsTimestamp),
      },
      nanoseconds: {
        local: formatDateTime(nanosecondsTimestamp, false),
        utc: formatDateTime(nanosecondsTimestamp, true),
        isValid: isTimestampValid(nanosecondsTimestamp),
      },
    };
  } catch (error) {
    const invalid = { local: 'Error', utc: 'Error', isValid: false };
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

    // Skip MAX_SAFE_INTEGER check for very large values that might be nanosecond timestamps
    // We'll handle precision loss in the conversion, but allow the calculation to proceed
    if (numValue === Infinity || numValue === -Infinity || isNaN(numValue)) {
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
