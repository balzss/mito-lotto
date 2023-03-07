import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders app correctly', () => {
  render(<App />);
  const ticketCounter = screen.getByText(/Lottery tickets: \d*/);
  const yearCounter = screen.getByText(/Years spent: \d*/);
  const twomatch = screen.getByText(/2 matches: \d*/);
  const threematch = screen.getByText(/3 matches: \d*/);
  const fourmatch = screen.getByText(/4 matches: \d*/);
  const fivematch = screen.getByText(/5 matches: \d*/);
  expect(ticketCounter).toBeInTheDocument();
  expect(yearCounter).toBeInTheDocument();
  expect(twomatch).toBeInTheDocument();
  expect(threematch).toBeInTheDocument();
  expect(fourmatch).toBeInTheDocument();
  expect(fivematch).toBeInTheDocument();
});

test('renders start btn first', () => {
  render(<App />);
  const startBtn = screen.getByText(/Start/);
  const pauseBtn = screen.queryByText(/Pause/);
  expect(startBtn).toBeInTheDocument();
  expect(pauseBtn).not.toBeInTheDocument();
});

test('renders pause and hides start btn after sim starts', () => {
  render(<App />);
  const startBtn = screen.getByText(/Start/);
  fireEvent.click(startBtn);
  const pauseBtn = screen.getByText(/Pause/);
  const startBtnQuery = screen.queryByText(/Start/);
  expect(pauseBtn).toBeInTheDocument();
  expect(startBtnQuery).not.toBeInTheDocument();
});
