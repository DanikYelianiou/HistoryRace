import { combineReducers } from 'redux';
import driversReducer from './slices';

const rootReducer = combineReducers({
    drivers: driversReducer,
});

export default rootReducer;
