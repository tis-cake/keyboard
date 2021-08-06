import React from 'react';

function QrAside() {
  return (
    <aside className="qr-aside">
      <figure className="qr-aside__img-wrap">
        <img className="qr-aside__img" src="assets/img/qr-code.png" alt="QR-код" width="110" height="110" />
        <figcaption className="qr-aside__desc">
          Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
        </figcaption>
      </figure>
    </aside>
  );
}

export { QrAside };
