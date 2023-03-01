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

function App() {
  const [intervalFn, setIntervalFn] = useState(null);
  const [simCycleCount, setSimCycleCount] = useState(2253);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simCycleMs, setSimCycleMs] = useState(300);
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const yearsSpent = Math.round(simCycleCount / 52);
  const moneySpent = simCycleCount * TICKET_PRICE;
  const matches = {
    'two': 57,
    'three': 1,
    'four': 0,
    'five': 0,
  };

  useEffect(() => {
    if (isSimRunning) {
      clearInterval(intervalFn);
      const interval = setInterval(() => {
        setLotteryNumbers(getLotteryNumbers())
        setSimCycleCount((prevCount) => prevCount + 1);
      }, simCycleMs);
      setIntervalFn(interval);
    } else if (intervalFn) {
      clearInterval(intervalFn);
    }

    return () => clearInterval(intervalFn);
  }, [isSimRunning, simCycleMs])

  const toggleSim = () => {
    setIsSimRunning((prevState) => !prevState);
  };

  const resetSim = () => {
    setSimCycleCount(0);
  };

  const handleSetCycleSpeed = (e) => {
    setSimCycleMs(e.target.value);
  };

  return (
    <main className="App">
      <h1>Lottery simulator</h1>
      <ul>
        <li>Lottery: {simCycleCount}</li>
        <li>Years spent: {yearsSpent}</li>
        <li>2 matches: {matches.two}</li>
        <li>3 matches: {matches.three}</li>
        <li>4 matches: {matches.four}</li>
        <li>5 matches: {matches.five}</li>
      </ul>
      <h2>Lottery numbers</h2>
      <div>
        {lotteryNumbers.join(', ')}
      </div>
      <h2>Your numbers</h2>
      <div>
        <div>
          <input type="number" disabled={isSimRunning}/>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="number" disabled={isSimRunning}/>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="number" disabled={isSimRunning}/>
          <input type="checkbox"/>
        </div>
        <div>
          <input type="number" disabled={isSimRunning}/>
        </div>
        <div>
          <input type="number" disabled={isSimRunning}/>
        </div>
      </div>
      <div>Total money spent on tickets: {moneySpent} Ft</div>
      <h2>Speed ({simCycleMs}ms)</h2>
      <input
        type="range"
        min={SIM_CYCLE_RANGE[0]}
        max={SIM_CYCLE_RANGE[1]}
        value={simCycleMs}
        onChange={handleSetCycleSpeed}
      />
      <div>
        <button onClick={toggleSim}>{isSimRunning ? 'Pause' : 'Start'}</button>
        {!isSimRunning && (
          <button onClick={resetSim}>Reset</button>
        )}
      </div>
    </main>
  );
}

export default App;
