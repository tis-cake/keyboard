import React from 'react';

import { QrAside } from '../../share/qr/qr-aside';
import { ButtonClose } from '../../share/button-close/button-close';

import { FIGCAPTION_QR_ASIDE } from '../../../const';

function PageBaseWrapper({ children }): React.ReactElement {
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

export { PageBaseWrapper };
