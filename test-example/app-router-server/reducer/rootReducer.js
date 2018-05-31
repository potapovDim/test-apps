import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import table from './'

const reducer = combineReducers({
  table
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;