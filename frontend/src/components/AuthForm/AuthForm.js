import React, { useState } from 'react'
import './AuthForm.css'

export const AuthForm = () => {
	const [isSignup, setIsSignup] = useState(false)

	const toggleForm = () => {
		setIsSignup(!isSignup)
	}

	return (
		<div className={`auth-container ${isSignup ? 'active' : ''}`}>
			<div className='auth-forms'>
				{/* Форма авторизации */}
				<div className='auth-form auth-form--login'>
					<span className='auth-form__title'>Авторизация</span>
					<form action='#'>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите почту' required />
							<i className='auth-form__icon uil uil-envelope'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='password' className='auth-form__input password' placeholder='Введите пароль' required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field auth-form__input-field--button'>
							<input type='button' className='auth-form__button' value='Войти' />
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

				{/* Форма регистрации */}
				<div className='auth-form auth-form--signup'>
					<span className='auth-form__title'>Регистрация</span>
					<form action='#'>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите ваше имя' required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите вашу фамилию' required />
							<i className='auth-form__icon uil uil-user'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите вашу почту' required />
							<i className='auth-form__icon uil uil-envelope'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='text' className='auth-form__input' placeholder='Введите ваш телефон' />
							<i className='auth-form__icon uil uil-phone'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='password' className='auth-form__input password' placeholder='Создайте пароль' required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field'>
							<input type='password' className='auth-form__input password' placeholder='Подтвердите пароль' required />
							<i className='auth-form__icon uil uil-lock'></i>
						</div>
						<div className='auth-form__input-field auth-form__input-field--button'>
							<input type='button' className='auth-form__button' value='Зарегистрироваться' />
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
