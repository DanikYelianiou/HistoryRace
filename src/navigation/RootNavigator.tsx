import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './Main';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const getNavigator = () => {
    return {
      component: MainNavigator,
      name: 'MainNavigator',
    };
  };

  const currentNavigator = getNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen component={currentNavigator.component} name={currentNavigator.name} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
