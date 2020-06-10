import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function PostGame() {
	const location = useLocation()
	const history = useHistory()

	const { isWinning, remainingDistance } = location.state

	const playAgain = () => {
		history.push('/ingame')
	}

	const winningView = () => {
		return (
			<div id='postGame'>
				CONGRATZ! You really love playing with the globe, don't you
				<div
					className='startButton'
					onClick={() => {
						playAgain()
					}}
				>
					Play Again
				</div>
			</div>
		)
	}

	const losingView = () => {
		return (
			<div id='postGame'>
				Toobad, you lose, you miss {Math.abs(remainingDistance)}KM from the actual distance
				<div
					className='startButton'
					onClick={() => {
						playAgain()
					}}
				>
					Play Again
				</div>
			</div>
		)
	}

	if (isWinning) {
		return winningView()
	} else {
		return losingView()
	}
}
