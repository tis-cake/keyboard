import React from 'react';

import { QrWrapper } from './qr-wrapper/qr-wrapper';
import { QrFigure } from './qr-figure/qr-figure';

const { QrFigureAside } = QrFigure;

function QrAside(props) {
  return (
    <aside className="qr-aside">
      <QrWrapper {...props}>
        <QrFigureAside {...props} />
      </QrWrapper>
    </aside>
  );
}

export { QrAside };
