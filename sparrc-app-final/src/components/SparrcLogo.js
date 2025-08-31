import React from 'react';
import { Image } from 'react-native';

const SparrcLogo = ({ size = 'normal' }) => {
  const logoSize = size === 'large' ? 90 : size === 'small' ? 40 : 60;
  return (
    <Image
      source={require('../../assets/spaarc-logo.png')}
      style={{ width: logoSize, height: logoSize, resizeMode: 'contain' }}
    />
  );
};
export default SparrcLogo;
