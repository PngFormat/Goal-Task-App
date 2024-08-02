import { combineReducers } from 'redux';
import goalsReducer from '../reducers/reducersGoal';
import userReducer from '../userReducer';


const rootReducer = combineReducers({
  user: userReducer,
  goals: goalsReducer,
});

export default rootReducer;
