import React from 'react'

export default function ({ name }) {
	return (
		<div className='card objective'>
			<span className='card-title'>Select the location of: </span>
			<span>{name}</span>
		</div>
	)
}
