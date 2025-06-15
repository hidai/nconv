import { useState, useMemo } from 'react'
import './App.css'
import { InputSection } from './components/InputSection'
import { ResultsSection } from './components/ResultsSection'
import { parseNumber } from './utils/numberParser'
import { convertAll } from './utils/converter'
import { useDebounce } from './utils/useDebounce'

function App() {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 300)

  const results = useMemo(() => {
    if (!debouncedInput.trim()) return null;
    
    const parsed = parseNumber(debouncedInput);
    return convertAll(parsed);
  }, [debouncedInput]);

  const error = results?.parsed.isValid === false ? results.parsed.error : undefined;

  return (
    <div className="App">
      <h1>Number Converter</h1>
      <InputSection 
        value={input} 
        onChange={setInput} 
        error={error}
      />
      <ResultsSection results={results} />
    </div>
  )
}

export default App