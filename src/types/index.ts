export interface ParsedNumber {
  value: bigint;
  originalInput: string;
  detectedBase: number;
  isValid: boolean;
  error?: string;
}

export interface ConversionResult {
  binary: string;
  decimal: string;
  hex: string;
  si: string;
  iec: string;
}

export interface UnixTimeResult {
  seconds: { local: string; utc: string };
  milliseconds: { local: string; utc: string };
  microseconds: { local: string; utc: string };
  nanoseconds: { local: string; utc: string };
}

export interface DurationResult {
  seconds: string;
  milliseconds: string;
  microseconds: string;
  nanoseconds: string;
}

export interface AllResults {
  parsed: ParsedNumber;
  conversions: ConversionResult;
  unixTime: UnixTimeResult;
  duration: DurationResult;
}