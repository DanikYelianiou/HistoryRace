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

interface DriversState {
  drivers: Driver[];
  driver: Driver | null;
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  offset: number;
}

const initialState: DriversState = {
  drivers: [],
  driver: null,
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  offset: 0,
};

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async ({ limit, offset }: { limit: string; offset: string }) => {
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
  const response = await axios.get(`${Config.API_URL}/f1/drivers/${driverId}.json`);
  return response.data.MRData.DriverTable.Drivers[0];
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
      });
  },
});

export const { setOffset, setLimit, clearDriver, clearError } = driversSlice.actions;

export default driversSlice.reducer; 