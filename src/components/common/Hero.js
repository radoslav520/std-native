import React from 'react';
import { ImageBackground } from 'react-native';
import { Caption, Surface } from 'react-native-paper';

import { LogoWhite } from './reuseable';

const Hero = ({ anonym, title }) => {
  const { heroStyle, heroFooter, textStyle } = styles;
  return (
    <Surface>
      <ImageBackground source={require('../../assets/cover.jpg')} style={heroStyle}>
        <LogoWhite />
        <Caption style={textStyle}>{title}</Caption>

        <Surface style={heroFooter}>
          <Caption style={{ color: '#fff', fontWeight: '100', fontSize: 18 }}>{anonym}</Caption>
        </Surface>

        <Surface />
      </ImageBackground>
    </Surface>
  );
};

const styles = {
  heroStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
    marginTop: 20
  },
  heroFooter: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)',
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  }
};

export default Hero;
