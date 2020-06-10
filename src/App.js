import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Intro from './views/intro'
import InGame from './views/ingame'
import PostGame from './views/postgame'

import './App.css'
import gameData from './data.json'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/ingame'>
					<InGame cities={gameData.cities} />
				</Route>
				<Route path='/postgame'>
					<PostGame />
				</Route>
				<Route path='/'>
					<Intro />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
