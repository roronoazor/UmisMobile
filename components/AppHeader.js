import {Header, Icon, View, Text} from 'native-base';
import React from 'react';
import { primaryColor } from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({
  title,
  color = primaryColor,
  leadingIcon,
  actionIcon,
}) => {
  const navigation = useNavigation();
  return (
    <Header noShadow style={{alignItems: 'center', backgroundColor: color}}>
      {!leadingIcon ? (
        <Icon
          name="power-settings-new"
          style={{color: '#FFF', fontSize: 28}}
          type="MaterialIcons"
        />
      ) : (
        leadingIcon
      )}

      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 18,
            color: '#FFF',
            fontWeight: '400',
          }}>
          {title}
        </Text>
      </View>
      {!actionIcon ? (
        <Icon
          onPress={navigation.toggleDrawer}
          name="menu"
          style={{color: '#FFF', fontSize: 28}}
          type="MaterialIcons"
        />
      ) : (
        actionIcon
      )}
    </Header>
  );
};

export default AppHeader;