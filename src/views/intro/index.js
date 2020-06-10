import React, { useState } from 'react'

import './styles.css'
import bg from '../../assets/bg.png'
import { useHistory } from 'react-router-dom'

export default function Intro() {
	const [showTutorial, setShowTutorial] = useState(false)
	const history = useHistory()

	const startPlaying = () => {
		history.push('/ingame')
	}

	const toggleTutorial = () => {
		setShowTutorial(!showTutorial)
	}

	return (
		<div id='introContainer'>
			<img alt='background' src={bg} className='bg' />
			<div className='overlays'>
				<h1 className='gameTitle'>Cities Quiz</h1>
				<h2 className='subtitle'> can you pinpoin where the city is?</h2>

				<div className='button-rows'>
					<div className='startButton' onClick={startPlaying}>
						Start Playing
					</div>
					<div className='helpButton' onClick={toggleTutorial}>
						{showTutorial ? 'Hide the rules' : 'Show the rules'}
					</div>
				</div>
				{showTutorial && (
					<div className='tutorials'>
						<ol>
							<li>click on the map where you think the objective (city name) is</li>
							<li>place the pins</li>
							<li>see if you got the location right</li>
							<li>you got 1500distance for a start, if you choose the wrong city, we'll deduce the distance</li>
							<li>the game ends if you spent all of the remaining distance</li>
						</ol>
					</div>
				)}
			</div>
		</div>
	)
}
