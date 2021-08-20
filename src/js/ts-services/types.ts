import React from 'react';

type TSetStateAction = React.Dispatch<React.SetStateAction<string>>;

type TKeyboardButtons = React.MutableRefObject<HTMLButtonElement>[];

export { TSetStateAction, TKeyboardButtons };
