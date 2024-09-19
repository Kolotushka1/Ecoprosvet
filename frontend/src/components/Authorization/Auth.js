import axios from 'axios'
import { MAX_BASE_URL } from '../../utils/constants'

export const Register = (email, password, passwordSecond, name, surname, phone) => {
	const newUser = { email, password, passwordSecond, name, surname, phone }
	console.log(newUser)
	axios
		.post(`${MAX_BASE_URL}auth/register`, newUser)
		.then(response => {
			console.log('Registration successful', response.data)
			Login(email, password)
		})
		.catch(error => {
			console.error('Registration error', error)
		})
}

export const Login = (email, password) => {
	console.log(email)
	console.log(password)
	axios
		.post(`${MAX_BASE_URL}auth/login`, { email, password })
		.then(response => {
			localStorage.setItem('jwtToken', response.data.accessToken)
			console.log('Logged in and token stored')
			console.log(getToken())
			window.location.href = '/'
		})
		.catch(error => {
			console.error('Login failed', error)
		})
}

export const RegisterOrganization = (email, phone, password, passwordSecond, organizationName, addressRegistration, inn, name, surname) => {
	const newUser = { email, phone, password, passwordSecond, organizationName, addressRegistration, inn, name, surname }
	console.log(newUser)
	axios
		.post(`${MAX_BASE_URL}auth/register/organization`, newUser)
		.then(response => {
			console.log('Registration successful', response.data)
			Login(email, password)
		})
		.catch(error => {
			console.error('Registration error', error)
		})
}

export const getToken = () => {
	return localStorage.getItem('jwtToken')
}

export const makeAuthorizedRequest = () => {
	const token = getToken()
	if (token) {
		axios
			.post(`${MAX_BASE_URL}auth/check/token`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				console.log('Authorized response:', response.data)
			})
			.catch(error => {
				console.error('Error with authorized request:', error.response)
			})
	} else {
		console.log('No token found, please login first.')
	}
}

const logout = () => {
	localStorage.removeItem('jwtToken')
	console.log('Logged out and token removed')
}
