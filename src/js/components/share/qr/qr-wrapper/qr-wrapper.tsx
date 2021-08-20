import React from 'react';

interface IQrWrapperProps {
  blockClassName: string,
}

const QrWrapper: React.FC<IQrWrapperProps> = ({ blockClassName, children }) => {
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
};

export { QrWrapper };
