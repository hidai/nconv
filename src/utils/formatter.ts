const SI_UNITS = [
  { value: 1000000000000000000000000n, suffix: 'Y' },
  { value: 1000000000000000000000n, suffix: 'Z' },
  { value: 1000000000000000000n, suffix: 'E' },
  { value: 1000000000000000n, suffix: 'P' },
  { value: 1000000000000n, suffix: 'T' },
  { value: 1000000000n, suffix: 'G' },
  { value: 1000000n, suffix: 'M' },
  { value: 1000n, suffix: 'K' },
];

const IEC_UNITS = [
  { value: 1n << 80n, suffix: 'Yi' },
  { value: 1n << 70n, suffix: 'Zi' },
  { value: 1n << 60n, suffix: 'Ei' },
  { value: 1n << 50n, suffix: 'Pi' },
  { value: 1n << 40n, suffix: 'Ti' },
  { value: 1n << 30n, suffix: 'Gi' },
  { value: 1n << 20n, suffix: 'Mi' },
  { value: 1n << 10n, suffix: 'Ki' },
];

export function formatWithSeparators(value: bigint): string {
  const str = value.toString();
  const isNegative = str.startsWith('-');
  const digits = isNegative ? str.slice(1) : str;
  
  const parts = [];
  for (let i = digits.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    parts.unshift(digits.slice(start, i));
  }
  
  return (isNegative ? '-' : '') + parts.join(',');
}

export function formatSI(value: bigint): string {
  const absValue = value < 0n ? -value : value;
  const sign = value < 0n ? '-' : '';
  
  for (const unit of SI_UNITS) {
    if (absValue >= unit.value) {
      const quotient = absValue / unit.value;
      const remainder = absValue % unit.value;
      
      if (remainder === 0n) {
        return `${sign}${quotient}${unit.suffix}`;
      } else {
        const decimal = Number(remainder) / Number(unit.value);
        const formatted = (Number(quotient) + decimal).toFixed(2);
        return `${sign}${formatted}${unit.suffix}`;
      }
    }
  }
  
  return formatWithSeparators(value);
}

export function formatIEC(value: bigint): string {
  const absValue = value < 0n ? -value : value;
  const sign = value < 0n ? '-' : '';
  
  for (const unit of IEC_UNITS) {
    if (absValue >= unit.value) {
      const quotient = absValue / unit.value;
      const remainder = absValue % unit.value;
      
      if (remainder === 0n) {
        return `${sign}${quotient}${unit.suffix}`;
      } else {
        const decimal = Number(remainder) / Number(unit.value);
        const formatted = (Number(quotient) + decimal).toFixed(2);
        return `${sign}${formatted}${unit.suffix}`;
      }
    }
  }
  
  return formatWithSeparators(value);
}

export function formatDateTime(timestamp: number, isUTC: boolean = false): string {
  const date = new Date(timestamp);
  
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: isUTC ? 'UTC' : undefined,
    hour12: false
  });
  
  return formatter.format(date);
}

export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 0) {
    return '-' + formatDuration(-totalSeconds);
  }
  
  const seconds = Math.floor(totalSeconds) % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const date = new Date(0);
    date.setUTCDate(date.getUTCDate() + days);
    return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCDate()).padStart(2, '0')} ${String(remainingHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}