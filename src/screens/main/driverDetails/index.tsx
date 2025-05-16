import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { clearDriver, clearError, fetchDriver } from '../../../redux/slices/index.ts';
import { MainNavigationProps, MainScreenProps } from '../../../interfaces/navigation/main.interface.ts';
import { MAIN_ROUTE } from '../../../routes/routes.ts';
import DriverDetailsView from './DriverDetailsView.tsx';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks.ts';

const DriverDetails = (
  { route }: MainScreenProps<typeof MAIN_ROUTE.DRIVER_DETAILS>
) => {
  const { driverId } = route.params;
  const dispatch = useAppDispatch();
  const { driver, loading, error } = useAppSelector(state => state.drivers);

  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.DRIVER_DETAILS>>();

  const handleGoBack = useCallback(() => {
    if (error) {
      dispatch(clearError());
    } else {
      dispatch(clearDriver());
    }
    navigation.goBack();
  }, [error, dispatch, navigation]);

  useEffect(() => {
    dispatch(fetchDriver(driverId));
  }, [dispatch, driverId]);

  return (
    <DriverDetailsView
      loading={loading}
      error={error}
      handleGoBack={handleGoBack}
      driver={driver}
    />
  );
};

export default DriverDetails;
