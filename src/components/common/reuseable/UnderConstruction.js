import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNamespaces } from 'react-i18next';

const UnderConstruction = ({ t }) => {
  return (
    <View style={containerStyle}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        {t('common.reusable.under construction')}
      </Text>
      <Icon name='wrench' size={60} backgroundColor='#3b5998' />
    </View>
  );
};

const containerStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10
};

export default withNamespaces()(UnderConstruction);
