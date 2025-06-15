import { memo } from 'react';
import type { UnixTimeResult } from '../types';

interface UnixTimeTableProps {
  unixTime: UnixTimeResult;
}

export const UnixTimeTable = memo(function UnixTimeTable({ unixTime }: UnixTimeTableProps) {
  return (
    <div className="result-group">
      <h3>Unix Time Interpretation</h3>
      <table className="time-table">
        <thead>
          <tr>
            <th>Unit</th>
            <th>Local Time</th>
            <th>UTC Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>seconds</td>
            <td>{unixTime.seconds.local}</td>
            <td>{unixTime.seconds.utc}</td>
          </tr>
          <tr>
            <td>milliseconds</td>
            <td>{unixTime.milliseconds.local}</td>
            <td>{unixTime.milliseconds.utc}</td>
          </tr>
          <tr>
            <td>microseconds</td>
            <td>{unixTime.microseconds.local}</td>
            <td>{unixTime.microseconds.utc}</td>
          </tr>
          <tr>
            <td>nanoseconds</td>
            <td>{unixTime.nanoseconds.local}</td>
            <td>{unixTime.nanoseconds.utc}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
