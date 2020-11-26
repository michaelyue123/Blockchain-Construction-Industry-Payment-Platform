import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { dashboard_data_display } from './dashboard.reducer';

const rootReducer = combineReducers({
    authentication,
    dashboard_data_display
});

export default rootReducer;