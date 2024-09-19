import React, { useState } from 'react'
import { Login, RegisterOrganization } from '../Authorization/Auth'
import './RegisterOrganization.css'

export const AuthOrgForm = () => {
	const [isSignup, setIsSignup] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordSecond, setPasswordSecond] = useState('')
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [phone, setPhone] = useState('')
	const [searchData, setSearchData] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [selectedOrg, setSelectedOrg] = useState(null)
	const [organizationName, setOrganizationName] = useState(null)

	const [addressRegistration, setAddressRegistration] = useState('')
	const [inn, setINN] = useState('')

	const toggleForm = () => {
		setIsSignup(!isSignup)
	}

	const handleRegister = () => {
		console.log(phone)
		RegisterOrganization(email, phone, password, passwordSecond, organizationName, addressRegistration, inn, name, surname)
	}
	const handleLogin = () => Login(email, password)

	const handleSearch = () => {
		const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
		const token = '44dd04e105d70947f97d200377e2692dc271e159' // Replace with your actual API key

		const options = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Token ' + token,
			},
			body: JSON.stringify({ query: searchData }),
		}

		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setSuggestions(result.suggestions || [])
			})
			.catch(error => console.log('error', error))
	}

	const handleSelectOrg = suggestion => {
		console.log(suggestion)
		setSelectedOrg(suggestion)
		setOrganizationName(suggestion.data.name.full_with_opf)
		setAddressRegistration(suggestion.data.address.value)
		setPhone(suggestion.data.phones)
		setINN(suggestion.data.inn)
	}

	return (
		<div className={`auth-container ${isSignup ? 'active' : ''}`}>
			<div className='auth-forms'>
				<div className='auth-form auth-form--login'>
					<span className='auth-form__title'>Авторизация</span>
					<form action='#'>
						{/* Login fields */}
						<div className='auth-form__input-field'>
							<input type='text' name='email' className='auth-form__input' placeholder='Введите почту' value={email} onChange={e => setEmail(e.target.value)} required />
							<i className='auth-form__icon uil uil-envelope'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='password' name='password' className='auth-form__input password' placeholder='Введите пароль' value={password} onChange={e => setPassword(e.target.value)} required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field auth-form__input-field--button'>
							<input type='button' className='auth-form__button' value='Войти' onClick={handleLogin} />
						</div>
					</form>
					<div className='auth-form__login-signup'>
						<span className='auth-form__text'>
							Нет аккаунта?
							<a href='#' className='auth-form__link auth-form__link--signup' onClick={toggleForm}>
								Зарегистрируйтесь
							</a>
						</span>
					</div>
				</div>

				<div className='auth-form auth-form--signup'>
					<span className='auth-form__title'>Регистрация организации</span>
					<form action='#'>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Поиск организации' value={searchData} onChange={e => setSearchData(e.target.value)} />
							<i className='auth-form__icon uil uil-search'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='button' className='auth-form__button' value='Поиск' onClick={handleSearch} />
						</div>
						<div className='auth-form__input-field'>
							{suggestions.length > 0 && (
								<select className='auth-form__input auth-form__dropdown' onChange={e => handleSelectOrg(suggestions[e.target.selectedIndex])}>
									{suggestions.map((suggestion, index) => (
										<option key={index} value={suggestion.value}>
											{suggestion.value}
										</option>
									))}
								</select>
							)}
						</div>

						{/* Dropdown for organization suggestions */}

						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите ИНН организации' value={inn} onChange={e => setINN(e.target.value)} required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>

						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Адрес регистрации организации' value={addressRegistration} onChange={e => setAddressRegistration(e.target.value)} required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>

						{/* Fields will be auto-filled after selection */}
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Имя организации' value={organizationName} onChange={e => setOrganizationName(e.target.value)} required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Телефон организаций' value={phone} onChange={e => setPhone(e.target.value)} required />
							<i className='auth-form__icon uil uil-phone'></i>
						</div>

						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите ваше имя' value={name} onChange={e => setName(e.target.value)} required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите вашу фамилию' value={surname} onChange={e => setSurname(e.target.value)} required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите вашу почту' value={email} onChange={e => setEmail(e.target.value)} required />
							<i className='auth-form__icon uil uil-envelope'></i>
						</div>

						<div className='auth-form__input-field'>
							<input type='password' className='auth-form__input password' placeholder='Создайте пароль' value={password} onChange={e => setPassword(e.target.value)} required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='password' className='auth-form__input password' placeholder='Подтвердите пароль' value={passwordSecond} onChange={e => setPasswordSecond(e.target.value)} required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field auth-form__input-field--button'>
							<input type='button' className='auth-form__button' value='Зарегистрироваться' onClick={handleRegister} />
						</div>
					</form>
					<div className='auth-form__login-signup'>
						<span className='auth-form__text'>
							Есть аккаунт?
							<a href='#' className='auth-form__link auth-form__link--login' onClick={toggleForm}>
								Авторизируйтесь
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
