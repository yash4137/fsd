import { useState } from 'react';
import SpotlightCard from './Components/spotlight';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(expression));
      } catch {
        setResult('Error');
      }
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
      setResult(null);
    } else {
      setExpression(expression + value);
      setResult(null);
    }
  };

  const buttonStyle = 'rounded-xl text-lg font-semibold py-4 transition-transform hover:scale-105 active:scale-95 shadow';

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <SpotlightCard className="w-[360px] sm:w-[400px] p-6 shadow-2xl border border-gray-700 text-white" spotlightColor="rgba(0, 229, 255, 0.2)">
       
        <div className="mb-6 p-4 bg-white/10 rounded-xl text-right space-y-2 shadow-inner min-h-[100px]">
          <div className="text-xl sm:text-2xl text-white font-mono break-all">{expression || '0'}</div>
          <div className="text-4xl sm:text-5xl font-bold text-white">{result !== null ? result : ''}</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          <button onClick={() => handleButtonClick('/')} className={`bg-pink-600 ${buttonStyle}`}>/</button>
          <button onClick={() => handleButtonClick('*')} className={`bg-pink-600 ${buttonStyle}`}>*</button>
          <button onClick={() => handleButtonClick('+')} className={`bg-pink-600 ${buttonStyle}`}>+</button>
          <button onClick={() => handleButtonClick('-')} className={`bg-pink-600 ${buttonStyle}`}>-</button>
          <button onClick={() => handleButtonClick('DEL')} className={`bg-red-600 ${buttonStyle}`}>DEL</button>
        </div>

        {/* Number Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleButtonClick(num.toString())} className={`bg-gray-700 ${buttonStyle}`}>
              {num}
            </button>
          ))}
          <button onClick={() => handleButtonClick('0')} className={`bg-gray-700 ${buttonStyle}`}>0</button>
          <button onClick={() => handleButtonClick('.')} className={`bg-gray-700 ${buttonStyle}`}>.</button>
          <button onClick={() => handleButtonClick('=')} className={`bg-green-600 ${buttonStyle}`}>=</button>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default App;
