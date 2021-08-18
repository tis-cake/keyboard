import React from 'react';
import PropTypes from 'prop-types';

import { QrAside } from '../../share/qr/qr-aside';
import { ButtonClose } from '../../share/button-close/button-close';

import { FIGCAPTION_QR_ASIDE } from '../../../const';

function PageBaseWrapper({ children }) {
  return (
    <>
      <div className="content-wrap">
        {children}
      </div>

      <ButtonClose />
      <QrAside figcaption={FIGCAPTION_QR_ASIDE} />
    </>
  );
}

PageBaseWrapper.propTypes = { children: PropTypes.element };

export { PageBaseWrapper };
