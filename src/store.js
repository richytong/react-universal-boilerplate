import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchCircuits } from './api';

// actions
export const initializeSession = () => ({ type: 'INITIALIZE_SESSION' });

const storeCircuitData = circuitData => ({ circuitData, type: 'STORE_CIRCUIT_DATA' });

// thunks - function that returns a function
export const fetchCircuitData = () => async (dispatch) => {
  const circuitData = await fetchCircuits();
  return dispatch(storeCircuitData(circuitData));
};

// reducers
const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZE_SESSION':
      return true;
    default:
      return state;
  }
};

const circuitDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CIRCUIT_DATA':
      return action.circuitData;
    default:
      return state;
  }
};

// combine reducers and namespace the redux state
const reducer = combineReducers({
  loggedIn: sessionReducer,
  circuitData: circuitDataReducer,
});

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
