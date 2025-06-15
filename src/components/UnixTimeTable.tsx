import { memo, useState, useEffect } from 'react';
import type { UnixTimeResult } from '../types';
import { CopyableValue } from './CopyableValue';

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
          <CopyableValue value={unixTime.seconds.local} className="unix-input-value" />
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <CopyableValue value={formatCurrentTime('seconds')} className="unix-current-value" />
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">milliseconds:</span>
        <div className="unix-time-values">
          <CopyableValue value={unixTime.milliseconds.local} className="unix-input-value" />
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <CopyableValue value={formatCurrentTime('milliseconds')} className="unix-current-value" />
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">microseconds:</span>
        <div className="unix-time-values">
          <CopyableValue value={unixTime.microseconds.local} className="unix-input-value" />
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <CopyableValue value={formatCurrentTime('microseconds')} className="unix-current-value" />
        </div>
      </div>
      <div className="result-row unix-time-row">
        <span className="result-label">nanoseconds:</span>
        <div className="unix-time-values">
          <CopyableValue value={unixTime.nanoseconds.local} className="unix-input-value" />
          <span className="unix-separator">|</span>
          <span className="unix-current-label">Now:</span>
          <CopyableValue value={formatCurrentTime('nanoseconds')} className="unix-current-value" />
        </div>
      </div>
    </div>
  );
});
