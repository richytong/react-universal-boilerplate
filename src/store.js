import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchTopAnime, fetchAnimeDetail } from './api';

// actions and thunks - basically actions but as functions - use in same contract as actions `store.dispatch(action)`
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
  topAnime: topAnimeReducer,
  animeDetail: animeDetailReducer,
});

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
