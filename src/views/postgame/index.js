import React from 'react'
import { useLocation } from 'react-router-dom'

export default function PostGame() {
	const location = useLocation()
	const { isWinning, remainingDistance } = location.state

	if (isWinning) {
		return <div>CONGRATZ!</div>
	} else {
		return <div>Toobad, you loose, you miss {Math.abs(remainingDistance)}KM from the actual distance</div>
	}
}
