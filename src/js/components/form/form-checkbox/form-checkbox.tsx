import React from 'react';

interface IFormCheckboxProps {
  checked: boolean,
  setChecked(isChecked: boolean): void,
}

const FormCheckbox: React.FC<IFormCheckboxProps> = ({ checked, setChecked }) => {
  return (
    <>
      <input
        className="form__checkbox-input visually-hidden"
        type="checkbox"
        id="formCheckbox"
        required
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        className="form__checkbox-label"
        htmlFor="formCheckbox"
      >
        Согласие на обработку персональных данных
      </label>
    </>
  );
};

export { FormCheckbox };
