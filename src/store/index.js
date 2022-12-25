import { createStore } from 'redux'
import reducer from './reducers/themeReducer'

const store = createStore(reducer)

export default store;