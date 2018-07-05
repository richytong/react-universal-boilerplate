# React Universal Boilerplate
Opinionated config for an isomorphic, that is SSR + SPA React application with Node Express and React Router. Simply clone/fork and write views.

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
```redux-thunk``` middleware allows you to write action creators that return a function instead of an action so you have more control when composing your redux actions. Abstract away network control flow to a thunk. You can also write normal action creators that return state. See the [docs](https://www.npmjs.com/package/redux-thunk)