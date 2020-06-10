import axios from 'axios'

export default axios.create({
	method: 'get',
	timeout: 5000,
	baseURL: 'https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/',
})
