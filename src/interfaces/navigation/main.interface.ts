import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { MAIN_ROUTE } from '../../routes/routes';

export type MainStackParamList = {
  [MAIN_ROUTE.DRIVERS_LIST]: undefined;
  [MAIN_ROUTE.DRIVER_DETAILS]: { driverId: string };
  [MAIN_ROUTE.DRIVER_RACE_HISTORY]: { driverId: string };
};

export type MainScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>;

export type MainNavigationProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>['navigation'];

export type MainRouteProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>['route'];

export type MainRouteParamsProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>['route']['params'];
