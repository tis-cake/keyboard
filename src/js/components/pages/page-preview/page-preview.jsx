import React from 'react';

import { Qr } from '../../qr/qr';
import { Video } from '../../video/video';

function PagePreview() {
  return (
    <div className="hero__wrap-hidden">
      <Video />
      <Qr />
    </div>
  );
}

export { PagePreview };
