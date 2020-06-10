import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import GoogleMap from 'google-map-react'

import mapsApi from '../../api/mapsApi'
import alternativeMapsApi from '../../api/alternativeMapsApi'

import PlaceButton from '../../components/button'
import Cards from '../../components/card'
import Notification from '../../components/notification'

import CurrentObjectiveCard from './currentObjective'

import './styles.css'
import mapStyles from './mapStyles.js'

export default function InGame({ cities }) {
	const history = useHistory()
	const location = useLocation()

	const [europeLatLng, setEuropeLatLng] = useState({ lat: 50.526, lng: 13.2551 })

	// loading state
	const [isCalculating, setIsCalculating] = useState(false)

	// game props
	const [remainingDistance, setRemainingDistance] = useState(1500)
	const [cityPlaced, setCityPlaced] = useState(0)
	const [stage, setStage] = useState(0)
	const [currentObjective, setCurrentObjective] = useState(cities[cityPlaced])
	const [notification, setNotification] = useState()
	// pin drops
	const [selectedLat, setSelectedLat] = useState(0)
	const [selectedLng, setSelectedLng] = useState(0)
	// gamehistory
	const [placedPins, setPlacedPins] = useState([])

	const placePin = async (pin) => {
		const { lat, lng } = pin
		await setSelectedLat(lat)
		await setSelectedLng(lng)
	}
	const clearNotification = () => {
		setNotification()
	}
	// game logics
	useEffect(() => {
		if (remainingDistance < 0) {
			history.push('/postgame', { isWinning: false, remainingDistance })
		}

		if (stage >= cities.length) {
			history.push('/postgame', { isWinning: true })
		}
		setCurrentObjective(cities[stage])
	}, [cities, stage, cityPlaced, remainingDistance, history])
	const calculateDistance = async () => {
		try {
			const destinations = `${currentObjective.position.lat},${currentObjective.position.lng}`
			const origins = `${selectedLat},${selectedLng}`
			console.log('calculating distance')
			setIsCalculating(true)

			const { data } = await alternativeMapsApi({
				url: `distancematrix/json?origins=${origins}&destinations=${destinations}&key=${process.env.REACT_APP_MAPAPIKEY}`,
			})
			setIsCalculating(false)
			setCityPlaced(cityPlaced + 1)
			console.log(data)

			// check if dropped pins is at currentObjective
			if (!data.origin_addresses.toString().includes(currentObjective.name)) {
				// jawaban salah. pin tidak mengandung kota objective
				const distance = Math.floor(data.rows[0].elements[0].distance.value / 1000)
				await setNotification({ status: 0, message: currentObjective.name })
				await setRemainingDistance(remainingDistance - distance)

				setSelectedLat(0)
				setSelectedLng(0)
			} else {
				await setNotification({ status: 1, message: currentObjective.name })
				// progress to next objective
				await setStage(stage + 1)

				setSelectedLat(0)
				setSelectedLng(0)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div id='ingame'>
			<div style={{ height: '100vh', width: '100%' }}>
				<GoogleMap
					bootstrapURLKeys={{ key: process.env.REACT_APP_MAPAPIKEY }}
					defaultCenter={europeLatLng}
					defaultZoom={5}
					options={{
						styles: mapStyles,
					}}
					onClick={(pin) => {
						placePin(pin)
					}}
				>
					{selectedLat && (
						<div lat={selectedLat} lng={selectedLng} text={`is this ${currentObjective.name}?`} className='pin'>
							<span role='img'>x</span>
							<span className='pin-taunt'>{`is this ${currentObjective.name}?`}</span>
						</div>
					)}
				</GoogleMap>
			</div>

			<div className='gameUI'>
				<div className='infos'>
					<Cards title='Remaining Distance' value={`${remainingDistance} Kilometers`} />
					<Cards title='Cities Placed' value={cityPlaced} />
				</div>
				<CurrentObjectiveCard name={currentObjective.name} />
			</div>
			<div className='placePin'>
				{notification && (
					<Notification message={notification.message} status={notification.status} clear={clearNotification} />
				)}
				{isCalculating && <div className='card card-loading'>wait, let me calculate~</div>}
				{selectedLat ? (
					<PlaceButton
						title={`Place! (${selectedLat.toFixed(2)}°N, ${selectedLng.toFixed(2)}°E)`}
						calculateDistance={calculateDistance}
					/>
				) : (
					<PlaceButton title={`drop a pin!`} />
				)}
			</div>
		</div>
	)
}
