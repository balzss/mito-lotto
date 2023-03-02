function randomFloat () {
  const randomInt = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return randomInt / 2**32;
}

export default function getLotteryNumbers (rangeStart = 1, rangeEnd = 90, count = 5) {
  const allNumbers = [...Array(rangeEnd + 1).keys()].slice(rangeStart);
  const randomSelection = allNumbers
          .map((n) => ({n, sortKey: randomFloat()}))
          .sort((a, b) => a.sortKey - b.sortKey)
          .map(({n}) => n)
          .slice(0, count);
  return randomSelection;
};
