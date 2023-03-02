import { useState, useEffect } from 'react';
import getLotteryNumbers from './utils/getLotteryNumbers';
import LotteryInput from './components/LotteryInput';
import './App.scss';

const SIM_CYCLE_RANGE = [1, 1000];
const TICKET_PRICE = 300;

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
