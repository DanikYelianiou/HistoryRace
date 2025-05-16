import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { fetchDrivers, setOffset } from '../../../redux/slices/index.ts';
import DriversListView from './DriversListView.tsx';
import { MainNavigationProps } from '../../../interfaces/navigation/main.interface.ts';
import { MAIN_ROUTE } from '../../../routes/routes.ts';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks.ts';

export type handleNavigateToDriverDetailParams = {
  name: typeof MAIN_ROUTE.DRIVER_DETAILS | typeof MAIN_ROUTE.DRIVER_RACE_HISTORY,
  params: { driverId: string },
};

const DriversList = () => {
  const dispatch = useAppDispatch();
  const { drivers, loading, error, total, limit, offset } = useAppSelector(state => state.drivers);

  const navigation = useNavigation<MainNavigationProps<typeof MAIN_ROUTE.DRIVERS_LIST>>();

  const handleNextPage = useCallback(() => {
    dispatch(setOffset(offset + limit));
  }, [dispatch, offset, limit]);

  const handlePreviousPage = useCallback(() => {
    dispatch(setOffset(offset - limit));
  }, [dispatch, offset, limit]);

  const isPreviousDisabled = useCallback((): boolean => offset === 0, [offset]);

  const isNextDisabled = useCallback((): boolean => offset + limit >= total, [offset, limit, total]);

  const handleNavigateToDriverDetail = useCallback(({name, params}: handleNavigateToDriverDetailParams) => {
    navigation.navigate(name, params);
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchDrivers({ limit, offset }));
  }, [dispatch, limit, offset]);

  return (
    <DriversListView
      drivers={drivers}
      loading={loading}
      error={error}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      isPreviousDisabled={isPreviousDisabled}
      isNextDisabled={isNextDisabled}
      handleNavigateToDriverDetail={handleNavigateToDriverDetail}
    />
  );
};

export default DriversList;
