import React from 'react';
import { KEMENAG_LOGO_DATA_URL } from '../assets/logoKemenagData';

export { KEMENAG_LOGO_DATA_URL };
export const KEMENAG_LOGO_PATH = '/logo-kemenag.png';

interface LogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const KemenagLogo: React.FC<LogoProps> = ({
  className = '',
  size = 180,
  alt = 'Logo Kementerian Agama Republik Indonesia'
}) => {
  return (
    <img
      src={KEMENAG_LOGO_DATA_URL}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain inline-block shrink-0 select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`
      }}
      loading="eager"
      decoding="sync"
    />
  );
};
