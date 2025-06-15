import { useCallback, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [options, setOptions] = useState({
    charActive: true,
    numberActive: true,
    length: 8,
    password: '',
    copied: false,
  });
  const { charActive, numberActive, length, password, copied } = options;

  // Password generation logic
  const generatePassword = useCallback(() => {
    let chars = '';
    if (charActive) chars += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberActive) chars += '0123456789';
    if (!chars) return '';
    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }, [charActive, numberActive, length]);

  // Generate password on mount and when options change
  const handleGenerate = () => {
    setOptions(prev => ({ ...prev, password: generatePassword(), copied: false }));
  };

  // Copy password to clipboard
  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setOptions(prev => ({ ...prev, copied: true }));
    }
  };

  // Handle option changes
  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value, copied: false }));
  };

  
  useEffect(() => {
    setOptions(prev => ({ ...prev, password: generatePassword(), copied: false }));
  }, [charActive, numberActive, length]);

  return (
    <div className="w-full max-w-md bg-blue-950">
      <div className="max-w-md mx-auto my-8 p-6 border border-gray-300 rounded-lg bg-gray-800 text-blue-50">
        <div className="flex items-center mb-4">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-1 mr-2 px-2 py-1 border border-gray-300 rounded text-amber-50 bg-gray-900"
          />
          <button
            className="h-9 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleCopy}
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={e => handleOptionChange('length', Number(e.target.value))}
            className="w-32 mr-4"
          />
          <label className="block mb-1">Length: {length}</label>
        </div>
        <div className="flex items-center">
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              checked={numberActive}
              onChange={e => handleOptionChange('numberActive', e.target.checked)}
              className="mr-1"
            />
            Number
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={charActive}
              onChange={e => handleOptionChange('charActive', e.target.checked)}
              className="mr-1"
            />
            Char
          </label>
        </div>
        <button
          className="mt-6 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={handleGenerate}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App
