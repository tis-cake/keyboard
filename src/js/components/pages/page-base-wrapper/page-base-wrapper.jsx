import React from 'react';
import PropTypes from 'prop-types';

import { QrAside } from '../../qr-aside/qr-aside';
import { ButtonClose } from '../../button-close/button-close';

function PageBaseWrapper({ children }) {
  return (
    <>
      <div className="content-wrap">
        {children}
      </div>

      <QrAside />
      <ButtonClose />
    </>
  );
}

PageBaseWrapper.propTypes = { children: PropTypes.element };
PageBaseWrapper.defaultProps = { children: PropTypes.element };

export { PageBaseWrapper };
