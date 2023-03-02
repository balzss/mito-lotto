import { useState, useEffect } from 'react';
import './App.scss';

const SIM_CYCLE_RANGE = [1, 1000];
const TICKET_PRICE = 300;

function randomFloat () {
  const randomInt = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return randomInt / 2**32;
}

function getLotteryNumbers (rangeStart = 1, rangeEnd = 90, count = 5) {
  const allNumbers = [...Array(rangeEnd + 1).keys()].slice(rangeStart);
  const randomSelection = allNumbers
          .map((n) => ({n, sortKey: randomFloat()}))
          .sort((a, b) => a.sortKey - b.sortKey)
          .map(({n}) => n)
          .slice(0, count);
  return randomSelection;
};

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

function App() {
  const [intervalFn, setIntervalFn] = useState(null);
  const [simCycleCount, setSimCycleCount] = useState(0);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simCycleMs, setSimCycleMs] = useState(300);
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const [yourNumbers, setYourNumbers] = useState([]);
  const [matches, setMatches] = useState({
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  });

  const yearsSpent = Math.round(simCycleCount / 52);
  const moneySpent = simCycleCount * TICKET_PRICE;

  useEffect(() => {
    clearInterval(intervalFn);
    if (isSimRunning) {
      setIntervalFn(setInterval(() => {
        setLotteryNumbers(getLotteryNumbers())
        setSimCycleCount((prevCount) => prevCount + 1);
      }, simCycleMs));
    }
    return () => clearInterval(intervalFn);
  }, [isSimRunning])

  useEffect(() => {
    const nMatch = lotteryNumbers.filter((n) => yourNumbers.includes(n))
    if (nMatch.length >= 2) {
      setMatches((prevMatches) => {
        return {
          ...prevMatches,
          [nMatch.length]: prevMatches[nMatch.length] + 1,
        };
      });
    }
  }, [lotteryNumbers])

  const toggleSim = () => {
    setIsSimRunning((prevState) => !prevState);
  };

  const resetSim = () => {
    setSimCycleCount(0);
    setLotteryNumbers([]);
    setMatches({
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    })
  };

  const handleSetCycleSpeed = (e) => {
    setSimCycleMs(e.target.value);
  };

  const handleLotteryInput = (v) => {
    setYourNumbers(v);
  }

  const validateInput = () => {
    return yourNumbers.every((v) => {
      const n = parseInt(v);
      return n >= 1 && n <= 90;
    });
  };

  return (
    <main className="App">
      <h1>Lottery simulator</h1>
      <ul>
        <li>Lottery: {simCycleCount}</li>
        <li>Years spent: {yearsSpent}</li>
        <li>2 matches: {matches['2']}</li>
        <li>3 matches: {matches['3']}</li>
        <li>4 matches: {matches['4']}</li>
        <li>5 matches: {matches['5']}</li>
      </ul>
      <h2>Lottery numbers</h2>
      <div>
        {lotteryNumbers.join(', ')}
      </div>
      <h2>Your numbers</h2>
      <LotteryInput onValuesChange={handleLotteryInput} disableInputs={isSimRunning}/>
      <div>Total money spent on tickets: {moneySpent} Ft</div>
      <h2>Speed ({simCycleMs}ms)</h2>
      <input
        type="range"
        className="input-slider"
        min={SIM_CYCLE_RANGE[0]}
        max={SIM_CYCLE_RANGE[1]}
        value={simCycleMs}
        onChange={handleSetCycleSpeed}
        disabled={isSimRunning}
      />
      <div>
        <button onClick={toggleSim} disabled={!validateInput()}>{isSimRunning ? 'Pause' : 'Start'}</button>
        {!isSimRunning && (
          <button onClick={resetSim}>Reset</button>
        )}
      </div>
    </main>
  );
}

export default App;
