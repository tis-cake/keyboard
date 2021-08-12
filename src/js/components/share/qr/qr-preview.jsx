import React from 'react';

import { QrWrapper } from './qr-wrapper/qr-wrapper';
import { QrFigure } from './qr-figure/qr-figure';

const { QrFigurePreview } = QrFigure;

function QrPreview(props) {
  return (
    <QrWrapper {...props}>
      <QrFigurePreview {...props} />
    </QrWrapper>
  );
}

export { QrPreview };
