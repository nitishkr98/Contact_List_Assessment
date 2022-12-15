import { combineReducers } from 'redux';
import CONTACT_REDUCER from './contact';

const appReducer = combineReducers({
  contacts: CONTACT_REDUCER,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
