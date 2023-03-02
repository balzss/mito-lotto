export default function validateInput (inputValues) {
  return inputValues.every((n) => {
    return n >= 1 && n <= 90;
  });
};
