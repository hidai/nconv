import { memo, useState, useEffect } from 'react';
import type { UnixTimeResult } from '../types';

interface UnixTimeTableProps {
  unixTime: UnixTimeResult;
}

export const UnixTimeTable = memo(function UnixTimeTable({ unixTime }: UnixTimeTableProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrentTime = (unit: string) => {
    const now = currentTime.getTime();
    switch (unit) {
      case 'seconds':
        return Math.floor(now / 1000).toString();
      case 'milliseconds':
        return now.toString();
      case 'microseconds':
        return (now * 1000).toString();
      case 'nanoseconds':
        return (now * 1000000).toString();
      default:
        return '';
    }
  };

  return (
    <div className="result-group">
      <h3>Unix Time Interpretation</h3>
      <div className="result-row unix-time-row">
        <span className="result-label">seconds:</span>
        <div className="unix-time-values">
          <span className="unix-input-value">{unixTime.seconds.local}</span>
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <span className="unix-current-value">{formatCurrentTime('seconds')}</span>
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">milliseconds:</span>
        <div className="unix-time-values">
          <span className="unix-input-value">{unixTime.milliseconds.local}</span>
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <span className="unix-current-value">{formatCurrentTime('milliseconds')}</span>
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">microseconds:</span>
        <div className="unix-time-values">
          <span className="unix-input-value">{unixTime.microseconds.local}</span>
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <span className="unix-current-value">{formatCurrentTime('microseconds')}</span>
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">nanoseconds:</span>
        <div className="unix-time-values">
          <span className="unix-input-value">{unixTime.nanoseconds.local}</span>
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <span className="unix-current-value">{formatCurrentTime('nanoseconds')}</span>
        </div>
      </div>
    </div>
  );
});
