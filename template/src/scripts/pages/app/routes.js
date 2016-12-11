import App from 'PAGE/app'
import Home from 'PAGE/home'

const basePath = '/'
let routes = {
	path: basePath,
	component: App,
	indexRoute: {
		component: Home
	},
	childRoutes: [
		{
			path: '*',
			onEnter: ({}, replace) => replace(basePath)
		}
	],
  onEnter: (state) => {},
  onChange: (prevState, nextState, repace) => {}
}

export default routes;
