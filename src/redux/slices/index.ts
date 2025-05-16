import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Config } from '../../api';

export interface Driver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface Location {
  lat: string,
  long: string,
  locality: string,
  country: string
}

export interface DriverRaceHistory {
  circuitId: string,
  url: string,
  circuitName: string,
  Location: Location
}

interface DriversState {
  drivers: Driver[];
  driver: Driver | null;
  driverRaceHistory: DriverRaceHistory[] | null;
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  offset: number;
  totalDriverRaceHistory: number,
  offsetDriverRaceHistory: number,
}

const initialState: DriversState = {
  drivers: [],
  driver: null,
  driverRaceHistory: null,
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
  totalDriverRaceHistory: 0,
  offsetDriverRaceHistory: 0,

};

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const { data } = await axios.get(`${Config.API_URL}/f1/drivers.json`, {
      params: { limit, offset },
    });
    return {
      drivers: data.MRData.DriverTable.Drivers,
      total: data.MRData.total,
    };
  }
);

export const fetchDriver = createAsyncThunk('driver/fetchDriver', async (driverId: string) => {
  const { data } = await axios.get(`${Config.API_URL}/f1/drivers/${driverId}.json`);
  return data.MRData.DriverTable.Drivers[0];
});

export const fetchDriverRaceHistory = createAsyncThunk('driver/fetchDriverRaceHistory', async (
  { driverId, limit, offset }: { driverId: string, limit: number; offset: number }
) => {
  const { data } = await axios.get(`${Config.API_URL}/f1/drivers/${driverId}/circuits.json`, {
    params: { limit, offset },
  });
  return {
    driverRaceHistory: data.MRData.CircuitTable.Circuits,
    total: data.MRData.total,
  };
});

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    clearDriver(state) {
      state.driver = null;
    },
    clearError(state) {
      state.error = null;
    },
    setOffsetDriverRaceHistory(state, action) {
      state.offsetDriverRaceHistory = action.payload;
    },
    clearDriverRaceHistory(state) {
      state.driverRaceHistory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload.drivers;
        state.total = action.payload.total;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      })

      .addCase(fetchDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.driver = action.payload;
      })
      .addCase(fetchDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch driver';
      })

      .addCase(fetchDriverRaceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverRaceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.driverRaceHistory = action.payload.driverRaceHistory;
        state.totalDriverRaceHistory = action.payload.total;
      })
      .addCase(fetchDriverRaceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  },
});

export const {
  setOffset,
  setLimit,
  clearDriver,
  clearError,
  setOffsetDriverRaceHistory,
  clearDriverRaceHistory,
} = driversSlice.actions;

export default driversSlice.reducer;
