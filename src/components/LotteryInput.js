/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import getLotteryNumbers from '../utils/getLotteryNumbers';

function LotteryInput({
  onValuesChange,
  disableInputs,
}) {
  const [checkboxValues, setCheckboxValues] = useState([false, false, false, false, false]);
  const [inputValues, setInputValues] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    onValuesChange(inputValues);
  }, [checkboxValues, inputValues]);

  const handleCheckBox = (event, index) => {
    const { checked } = event.target;
    if (checked) {
      const randomValue = getLotteryNumbers(1, 90, 90).find((n) => !inputValues.includes(n));
      setInputValues((prevValues) => prevValues.map((v, i) => i === index ? randomValue : v));
    }
    setCheckboxValues((prevValues) => prevValues.map((v, i) => i === index ? checked : v));
  };

  const handleInput = (event, index) => {
    const value = parseInt(event.target.value);
    setInputValues((prevValues) => prevValues.map((v, i) => i === index ? value : v));
  };

  return (
    <div className="lottery-inputs">
      <div>
        <input
          type="number"
          disabled={disableInputs || checkboxValues[0]}
          value={inputValues[0]}
          onChange={(e) => handleInput(e, 0)}
        />
        <input
          type="checkbox"
          id="input-1"
          disabled={disableInputs}
          onChange={(e) => handleCheckBox(e, 0)}
          checked={checkboxValues[0]}
        />
        <label htmlFor="input-1">Use random number</label>
      </div>
      <div>
        <input
          type="number"
          disabled={disableInputs || checkboxValues[1]}
          value={inputValues[1]}
          onChange={(e) => handleInput(e, 1)}
        />
        <input
          type="checkbox"
          id="input-2"
          disabled={disableInputs}
          onChange={(e) => handleCheckBox(e, 1)}
          checked={checkboxValues[1]}
        />
        <label htmlFor="input-2">Use random number</label>
      </div>
      <div>
        <input
          type="number"
          disabled={disableInputs || checkboxValues[2]}
          value={inputValues[2]}
          onChange={(e) => handleInput(e, 2)}
        />
        <input
          type="checkbox"
          id="input-3"
          disabled={disableInputs}
          onChange={(e) => handleCheckBox(e, 2)}
          checked={checkboxValues[2]}
        />
        <label htmlFor="input-3">Use random number</label>
      </div>
      <div>
        <input
          type="number"
          disabled={disableInputs || checkboxValues[3]}
          value={inputValues[3]}
          onChange={(e) => handleInput(e, 3)}
        />
        <input
          type="checkbox"
          id="input-4"
          disabled={disableInputs}
          onChange={(e) => handleCheckBox(e, 3)}
          checked={checkboxValues[3]}
        />
        <label htmlFor="input-4">Use random number</label>
      </div>
      <div>
        <input
          type="number"
          disabled={disableInputs || checkboxValues[4]}
          value={inputValues[4]}
          onChange={(e) => handleInput(e, 4)}
        />
        <input
          type="checkbox"
          id="input-5"
          disabled={disableInputs}
          onChange={(e) => handleCheckBox(e, 4)}
          checked={checkboxValues[4]}
        />
        <label htmlFor="input-5">Use random number</label>
      </div>
    </div>
  );
}

export default LotteryInput;
