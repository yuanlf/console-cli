import {browserHistory, Router} from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import routes from 'PAGE/app/routes'

/**
 * 同步的 Reducers（即应用初始化所必需的）
 * @type {Object}
 */
const syncReducers = {
  router: routerReducer,
  // TODO
}


/**
 * 异步加载的 Reducers（Code Splitting 按需加载的）
 * @type {Object}
 */
const asyncReducers = {}

const MOUNT_NODE = document.getElementById('app')
const middlewares = [thunk]
const createRootReducer = () => {
  return combineReducers({
    ...syncReducers,
    ...asyncReducers
  })
}

const store = createStore(
  createRootReducer(),
  window.__INITIAL_STATE__ || {}, // 初始store数据
  compose(
    applyMiddleware(...middlewares)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} children={routes} />
  </Provider>,
  MOUNT_NODE
)
