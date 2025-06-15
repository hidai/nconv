import { useMemo, useState } from 'react';
import './App.css';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { convertAll } from './utils/converter';
import { parseNumber } from './utils/numberParser';
import { useDebounce } from './utils/useDebounce';

function App() {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 100);

  const results = useMemo(() => {
    const inputToUse = input.trim();
    if (!inputToUse) return null;

    // 短い入力や基本的な数値の場合は即座に処理
    if (inputToUse.length <= 10 && /^-?(\d+|0x[\da-fA-F]+|0b[01]+|0o[0-7]+)$/.test(inputToUse)) {
      const parsed = parseNumber(inputToUse);
      return convertAll(parsed);
    }

    // 長い入力や複雑な入力の場合はデバウンス後に処理
    if (!debouncedInput.trim()) return null;
    const parsed = parseNumber(debouncedInput);
    return convertAll(parsed);
  }, [input, debouncedInput]);

  const error = results?.parsed.isValid === false ? results.parsed.error : undefined;

  return (
    <div className="App">
      <h1>Number Converter</h1>
      <InputSection value={input} onChange={setInput} error={error} />
      <ResultsSection results={results} />
    </div>
  );
}

export default App;
