import React from 'react';
import PropTypes from 'prop-types';

function FormCheckbox({ checked, setChecked }) {
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
}

FormCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export { FormCheckbox };
