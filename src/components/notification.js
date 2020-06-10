import React from 'react'

export default function ({ clear, status, message }) {
	if (status === 0) {
		return (
			<div onClick={clear} className='card card-dismissable card-wrong'>
				TOO BAD!, THAT WAS NOT {message}
			</div>
		)
	} else {
		return (
			<div onClick={clear} className='card card-dismissable card-right'>
				THAT WAS {message} ALRIGHT!
			</div>
		)
	}
}
