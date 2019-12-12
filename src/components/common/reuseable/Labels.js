import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import { Text } from 'react-native';

const HeaderLabel = ({ text }) => {
  return (
    <NamespacesConsumer>
      {(t) => <Text style={styles.headerLabelStyle}>{t(text)}</Text>}
    </NamespacesConsumer>
  );
};

const MenuLabel = ({ text }) => {
  return (
    <NamespacesConsumer>
      {(t) => <Text style={styles.menuLabelStyle}>{t(text)}</Text>}
    </NamespacesConsumer>
  );
};

const styles = {
  menuLabelStyle: {
    color: '#333',
    fontWeight: 'bold',
    width: '100%',
    padding: 15
  },
  headerLabelStyle: {
    fontWeight: '100',
    fontSize: 19,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
};

export { HeaderLabel, MenuLabel };
