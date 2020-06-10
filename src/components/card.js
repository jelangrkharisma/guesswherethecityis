import React from 'react'

export default function ({ title, value }) {
	return (
		<div className='card'>
			<span className='card-title'>{title}</span>
			<span className='card-value'>{value}</span>
		</div>
	)
}
