import React from 'react'
import './componentStyles.css'
export default function ({ title, calculateDistance }) {
	return (
		<div
			className='btn'
			onClick={() => {
				calculateDistance()
			}}
		>
			{title}
		</div>
	)
}
