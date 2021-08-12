import React from 'react';
import PropTypes from 'prop-types';

function QrFigurePreview({ figcaption }) {
  return (
    <figure className="qr__img-wrap">
      <img className="qr__img" src="assets/img/qr-code.png" alt="QR-код" width="126" height="126" />

      { figcaption ? (
        <figcaption className="qr__img-desc qr__img-desc--arrow">
          {figcaption}
        </figcaption>
      ) : false }
    </figure>
  );
}

function QrFigureAside({ figcaption }) {
  return (
    <figure className="qr__img-wrap">
      <img className="qr__img" src="assets/img/qr-code.png" alt="QR-код" width="110" height="110" />

      { figcaption ? (
        <figcaption className="qr__img-desc">
          {figcaption}
        </figcaption>
      ) : false }
    </figure>
  );
}

const QrFigure = { QrFigurePreview, QrFigureAside };

QrFigurePreview.propTypes = { figcaption: PropTypes.string };
QrFigureAside.propTypes = { figcaption: PropTypes.string };

export { QrFigure };
