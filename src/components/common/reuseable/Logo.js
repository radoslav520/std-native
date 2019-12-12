import React from 'react';
import { Image } from 'react-native';

const LogoWhite = () => {
  return (
    <Image
      source={require('../../../assets/logo-white.png')}
      style={{ width: 120, height: 60, resizeMode: 'contain' }}
    />
  );
};

const LogoBlack = () => {
  return (
    <Image
      source={require('../../../assets/logo.png')}
      style={{ width: 120, height: 60, resizeMode: 'contain' }}
    />
  );
};

const LogoCoder = () => {
  return (
    <Image
      source={require('../../../assets/coderconsulting.png')}
      style={{ width: 120, height: 60, resizeMode: 'contain' }}
    />
  );
};

export { LogoWhite, LogoBlack, LogoCoder };
