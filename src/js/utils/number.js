const MIN_COUNT_DIGIT = 1;
const CHAR_MASK = '_';

const undoNum = (currentNum) => {
  const numbers = currentNum.match(/\d/g);

  if (numbers.length === MIN_COUNT_DIGIT) {
    return currentNum;
  }

  const lastNumber = numbers[numbers.length - 1];
  const lastNumberIndex = currentNum.lastIndexOf(lastNumber);

  const chars = currentNum.split('');
  chars[lastNumberIndex] = CHAR_MASK;

  return chars.join('');
};

const addNum = (currentNum, inputValue) => {
  return currentNum.replace(CHAR_MASK, inputValue);
};

export {
  undoNum,
  addNum,
};
