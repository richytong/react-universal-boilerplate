import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchCircuits, fetchTopAnime, fetchAnimeDetail } from './api';

// actions
export const initializeSession = () => ({ type: 'INITIALIZE_SESSION' });

// thunks - function that returns a function - use in same contract as actions
export const fetchCircuitData = () => async (dispatch) => {
  const data = await fetchCircuits();
  return dispatch({ data, type: 'STORE_CIRCUIT_DATA' });
};

export const fetchAnimeData = () => async (dispatch) => {
  const data = await fetchTopAnime();
  return dispatch({ data, type: 'FETCH_ANIME_DATA' });
};

export const fetchAnimeDetailData = ({ malId }) => async (dispatch) => {
  const data = await fetchAnimeDetail(malId);
  return dispatch({ malId, data, type: 'FETCH_ANIME_DETAIL_DATA' });
};

export const resetAnimeDetailData = () => ({ type: 'RESET_ANIME_DETAIL_DATA' });

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
    case 'FETCH_ANIME_DATA':
      return action.data;
    default:
      return state;
  }
};

const animeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ANIME_DETAIL_DATA':
      return { malId: action.malId, data: action.data };
    case 'RESET_ANIME_DETAIL_DATA':
      return {};
    default:
      return state;
  }
};

// combine reducers and namespace the redux state
const reducer = combineReducers({
  loggedIn: sessionReducer,
  circuits: circuitsReducer,
  topAnime: topAnimeReducer,
  animeDetail: animeDetailReducer,
});

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
