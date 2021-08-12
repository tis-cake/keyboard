import React from 'react';
import PropTypes from 'prop-types';

function QrWrapper({ blockClassName, children }) {
  const blockClassNameQR = blockClassName
    ? `${blockClassName} qr`
    : 'qr';

  return (
    <a
      className={blockClassNameQR}
      href="https://github.com/tis-cake"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

QrWrapper.propTypes = {
  blockClassName: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export { QrWrapper };
