import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type MainStackParamList } from '../../interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '../../routes/routes';
import { MainScreens } from '../../screens';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator
    initialRouteName={MAIN_ROUTE.DRIVERS_LIST}
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Group>
      <MainStack.Screen component={MainScreens.DriversList} name={MAIN_ROUTE.DRIVERS_LIST} />
      <MainStack.Screen component={MainScreens.DriverDetails} name={MAIN_ROUTE.DRIVER_DETAILS} />
      <MainStack.Screen component={MainScreens.DriverRaceHistory} name={MAIN_ROUTE.DRIVER_RACE_HISTORY} />
    </MainStack.Group>
  </MainStack.Navigator>
);

export default MainNavigator;
