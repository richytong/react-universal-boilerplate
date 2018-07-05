import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchCircuits, fetchTopAnime } from './api';

// actions
export const initializeSession = () => ({ type: 'INITIALIZE_SESSION' });

// thunks - function that returns a function - use in same contract as actions
export const fetchCircuitData = () => async (dispatch) => {
  const data = await fetchCircuits();
  return dispatch({ data, type: 'STORE_CIRCUIT_DATA' });
};

export const fetchAnimeData = () => async (dispatch) => {
  const data = await fetchTopAnime();
  return dispatch({ data, type: 'GET_ANIME_DATA' });
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

const circuitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CIRCUIT_DATA':
      return action.data;
    default:
      return state;
  }
};

const topAnimeReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ANIME_DATA':
      return action.data;
    default:
      return state;
  }
};

// combine reducers and namespace the redux state
const reducer = combineReducers({
  loggedIn: sessionReducer,
  circuits: circuitsReducer,
  topAnime: topAnimeReducer,
});

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
