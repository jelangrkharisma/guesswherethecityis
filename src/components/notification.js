import React from 'react'

export default function ({ clear, status, message }) {
	if (status === 0) {
		return (
			<div onClick={clear} className='card card-dismissable card-wrong'>
				<span>TOO BAD!, THAT WAS NOT {message}</span>
				<span>X</span>
			</div>
		)
	} else {
		return (
			<div onClick={clear} className='card card-dismissable card-right'>
				<span>THAT WAS {message} ALRIGHT!</span>
				<span>X</span>
			</div>
		)
	}
}
