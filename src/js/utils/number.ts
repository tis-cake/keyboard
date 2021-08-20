import {
  TEL_UNDO_VALUE,
  BUTTON_UNDO_INDEX,
  BUTTON_ZERO_INDEX,
  ArrowAction,
} from '../const';

import { TSetStateAction, TKeyboardButtons } from '../ts-services/types';

const CHAR_MASK: string = '_';
const NEGATIVE_NUM: number = -1;
const MIN_COUNT_DIGIT: number = 1;

const GAP_VERTICAL: number = 3;
const GAP_HORIZONTAL: number = 1;
const GAP_BORDER_BOTTOM: number = 2;

const BUTTON_EIGHT_INDEX: number = 7;
const BUTTON_NINE_INDEX: number = 8;
const BUTTON_TOP_ROW_INDEXES: number[] = [0, 1, 2];

const undoNum = (currentNum: string): string => {
  const numbers: RegExpMatchArray = currentNum.match(/\d/g);

  if (numbers.length === MIN_COUNT_DIGIT) {
    return currentNum;
  }

  const lastNumber: string = numbers[numbers.length - 1];
  const lastNumberIndex: number = currentNum.lastIndexOf(lastNumber);

  const chars: string[] = currentNum.split('');
  chars[lastNumberIndex] = CHAR_MASK;

  return chars.join('');
};

const addNum = (currentNum: string, inputValue: string): string => {
  return currentNum.replace(CHAR_MASK, inputValue);
};

const updateTelState = (setTel: TSetStateAction, inputValue: string | number): void => {
  setTel((prev) => {
    if (Number(inputValue) === TEL_UNDO_VALUE) {
      return undoNum(prev);
    }

    return addNum(prev, String(inputValue));
  });
};

const updateFocus = (buttons: TKeyboardButtons, focusIndex: number, arrowValue: string): void => {
  if (focusIndex !== null && focusIndex !== undefined && !arrowValue) {
    return;
  }

  // направление
  const isUp: boolean = (arrowValue === ArrowAction.ARROW_UP);
  const isDown: boolean = (arrowValue === ArrowAction.ARROW_DOWN);
  const isLeft: boolean = (arrowValue === ArrowAction.ARROW_LEFT);
  const isRight: boolean = (arrowValue === ArrowAction.ARROW_RIGHT);

  let offset: number;

  // смещение (вне пограничной зоны)
  if (isUp) { offset = GAP_VERTICAL * NEGATIVE_NUM; }
  if (isDown) { offset = GAP_VERTICAL; }
  if (isLeft) { offset = GAP_HORIZONTAL * NEGATIVE_NUM; }
  if (isRight) { offset = GAP_HORIZONTAL; }

  // границы
  const isLastBottom: boolean = (isUp && focusIndex === BUTTON_ZERO_INDEX);
  const isBorderTop: boolean = (isUp && BUTTON_TOP_ROW_INDEXES.some((el) => focusIndex === el));
  const isBorderBottom: boolean = (isDown && (focusIndex === BUTTON_UNDO_INDEX || focusIndex === BUTTON_ZERO_INDEX));
  const isBeforeBorderBottom: boolean = (isDown && (focusIndex === BUTTON_NINE_INDEX || focusIndex ===  BUTTON_EIGHT_INDEX));

  if (isBorderBottom || isBorderTop) { return; }
  if (isLastBottom) { offset = GAP_BORDER_BOTTOM * NEGATIVE_NUM; }
  if (isBeforeBorderBottom) { offset = GAP_BORDER_BOTTOM; }

  const nextIndex: number = focusIndex + offset;
  const isOverflow: boolean = (nextIndex < 0 || nextIndex > buttons.length - 1);

  if (isOverflow) { return; }

  buttons[nextIndex].current.focus();
};

export {
  updateTelState,
  updateFocus,
};
