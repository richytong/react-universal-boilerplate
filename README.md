# React Universal Boilerplate
Opinionated config for a universal/isomorphic/SSR + SPA React application with Node Express and React Router. Simply clone/fork and write views.

## Getting started
Clone the repo with
```git clone https://github.com/richytong/react-universal-boilerplate```

Install dependencies with
```npm i```

Run dev mode with
```npm start```

Navigate to `http://localhost:3000`

## Production
Build production webpack with ```npm run build```

## Notes
```redux``` is a predicatable state container for Javascript apps. Predictable in its declarative approach to state management using ```Actions```, plain Javascript object payloads that send data to the application ```store``` - (```store.dispatch(action)```), and ```Reducers``` that take these ```Actions``` and specify how the application's state changes in response ```(previousState, action) => newState```. Reducers often switch on ```action.type``` to predictably and declaratively change the application state like so:
```Javascript
const myReducer = (previousState = [], action) => { // our application state is an array
  switch (action.type) {
    case 'SOME_ACTION_TYPE':
      const newState = action.data
      return newState;
    default:
      return state;
  }
};
```
Application state is declared in the reducer in this manner using the default function parameters. For more complex applications however, it is more practical to split up reducers into multiple more specific ones. Redux provides a utility called ```combineReducers``` that allows you to easily declare multiple reducers for different parts of your state:
```Javascript
const myReducerForA = (previousState = initialA, action) => action.newA;
const myReducerForB = (previousState = initialB, action) => action.newB;
const myReducerForC = (previousState = initialC, action) => action.newC;

// the following are equivalent
const entireReducer = combineReducers({
  a: myReducerForA,
  b: myReducerForB,
  c: myReducerForC,
});

const entireReducer = (state = {}, action) => ({
  a: myReducerForA(state.A, action),
  b: myReducerForB(state.B, action),
  c: myReducerForC(state.C, action),
})
```
All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys. The state for the above application would then be { a: someA, b: someB, c: someC }. [Actions](https://redux.js.org/basics/actions), [Reducers](https://redux.js.org/basics/reducers)

```redux-thunk``` middleware allows you to write action creators that return a function instead of an action so you have more control when composing your redux actions. Abstract away network control flow to a thunk. You can also write normal action creators that return state. See the [docs](https://www.npmjs.com/package/redux-thunk)
