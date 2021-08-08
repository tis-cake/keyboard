import {
  TEL_UNDO_VALUE,
  BUTTON_UNDO_INDEX,
  BUTTON_ZERO_INDEX,
  ArrowAction,
} from '../const';

const CHAR_MASK = '_';
const NEGATIVE_NUM = -1;
const MIN_COUNT_DIGIT = 1;

const GAP_VERTICAL = 3;
const GAP_HORIZONTAL = 1;
const GAP_BORDER_BOTTOM = 2;

const BUTTON_EIGHT_INDEX = 7;
const BUTTON_NINE_INDEX = 8;
const BUTTON_TOP_ROW_INDEXES = [0, 1, 2];

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

const updateTelState = (setTel, inputValue) => {
  setTel((prev) => {
    if (Number(inputValue) === TEL_UNDO_VALUE) {
      return undoNum(prev);
    }

    return addNum(prev, inputValue);
  });
};

const updateFocus = (buttons, focusIndex, arrowValue) => {
  if (focusIndex !== null && focusIndex !== undefined && !arrowValue) {
    return;
  }

  // направление
  const isUp = (arrowValue === ArrowAction.ARROW_UP);
  const isDown = (arrowValue === ArrowAction.ARROW_DOWN);
  const isLeft = (arrowValue === ArrowAction.ARROW_LEFT);
  const isRight = (arrowValue === ArrowAction.ARROW_RIGHT);

  let offset;

  // смещение (вне пограничной зоны)
  if (isUp) { offset = GAP_VERTICAL * NEGATIVE_NUM; }
  if (isDown) { offset = GAP_VERTICAL; }
  if (isLeft) { offset = GAP_HORIZONTAL * NEGATIVE_NUM; }
  if (isRight) { offset = GAP_HORIZONTAL; }

  // границы
  const isLastBottom = (isUp && focusIndex === BUTTON_ZERO_INDEX);
  const isBorderTop = (isUp && BUTTON_TOP_ROW_INDEXES.some((el) => focusIndex === el));
  const isBorderBottom = (isDown && (focusIndex === BUTTON_UNDO_INDEX || focusIndex === BUTTON_ZERO_INDEX));
  const isBeforeBorderBottom = (isDown && (focusIndex === BUTTON_NINE_INDEX || focusIndex ===  BUTTON_EIGHT_INDEX));

  if (isBorderBottom || isBorderTop) { return; }
  if (isLastBottom) { offset = GAP_BORDER_BOTTOM * NEGATIVE_NUM; }
  if (isBeforeBorderBottom) { offset = GAP_BORDER_BOTTOM; }

  const nextIndex = focusIndex + offset;
  const isOverflow = (nextIndex < 0 || nextIndex > buttons.length - 1);

  if (isOverflow) { return; }

  buttons[nextIndex].current.focus();
};

export {
  updateTelState,
  updateFocus,
};
