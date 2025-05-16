import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { clearDriverRaceHistory, clearError, fetchDriverRaceHistory, setOffsetDriverRaceHistory } from '../../../redux/slices/index.ts';
import DriverRaceHistoryView from './DriverRaceHistoryView.tsx';
import { MainNavigationProps, MainScreenProps } from '../../../interfaces/navigation/main.interface.ts';
import { MAIN_ROUTE } from '../../../routes/routes.ts';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks.ts';

const DriverRaceHistory = (
  { route }: MainScreenProps<typeof MAIN_ROUTE.DRIVER_RACE_HISTORY>
) => {
  const { driverId } = route.params;

  const dispatch = useAppDispatch();
  const {
    driverRaceHistory,
    loading,
    error,
    totalDriverRaceHistory,
    limit,
    offsetDriverRaceHistory,
  } = useAppSelector(state => state.drivers);

  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.DRIVERS_LIST>>();

  const handleGoBack = useCallback(() => {
    if (error) {
      dispatch(clearError());
    } else {
      dispatch(clearDriverRaceHistory());
    }
    navigation.goBack();
  }, [error, dispatch, navigation]);

  const handleNextPage = useCallback(() => {
    dispatch(setOffsetDriverRaceHistory(offsetDriverRaceHistory + limit));
  }, [dispatch, offsetDriverRaceHistory, limit]);

  const handlePreviousPage = useCallback(() => {
    dispatch(setOffsetDriverRaceHistory(offsetDriverRaceHistory - limit));
  }, [dispatch, offsetDriverRaceHistory, limit]);

  const isPreviousDisabled = useCallback((): boolean => offsetDriverRaceHistory === 0, [offsetDriverRaceHistory]);

  const isNextDisabled = useCallback((): boolean => offsetDriverRaceHistory + limit >= totalDriverRaceHistory, [offsetDriverRaceHistory, limit, totalDriverRaceHistory]);

  useEffect(() => {
    dispatch(fetchDriverRaceHistory({ driverId, limit, offset: offsetDriverRaceHistory }));
  }, [dispatch, limit, offsetDriverRaceHistory, driverId]);

  return (
    <DriverRaceHistoryView
      driverRaceHistory={driverRaceHistory}
      loading={loading}
      error={error}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      isPreviousDisabled={isPreviousDisabled}
      isNextDisabled={isNextDisabled}
      handleGoBack={handleGoBack}
    />
  );
};

export default DriverRaceHistory;
