import React, { useState } from 'react';
import './AuthForm.css';
import axios from 'axios';
import { MAX_BASE_URL } from '../../utils/constants';
import { Login, Register } from '../Authorization/Auth';
import { YandexAuth } from '../Authorization/YandexAuth';

export const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [name, setName] = useState(''); 
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };


  const handelRegister = () => Register(email, password, passwordSecond, name, surname, phone);
  const handelLogin = () => Login(email, password); 

  

  return (
    <div className={`auth-container ${isSignup ? 'active' : ''}`}>
      <div className='auth-forms'>
        <div className='auth-form auth-form--login'>
          <span className='auth-form__title'>Авторизация</span>
          <div className='auth-form__input-field auth-form__input-field--button'>
              <YandexAuth />
            </div>
          <form action=''>
            <div className='auth-form__input-field'>
              <input
                type='text'
                name='email'
                className='auth-form__input'
                placeholder='Введите почту'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-envelope'></i>
            </div>
            <div className='auth-form__input-field'>
              <input
                type='password'
                name='password'
                className='auth-form__input password'
                placeholder='Введите пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-lock'></i>
            </div>
            <div className='auth-form__input-field auth-form__input-field--button'>
              <input
                type='button'
                className='auth-form__button'
                value='Войти'
                onClick={ handelLogin }
              />
            </div>
            
          </form>
          <div className='auth-form__login-signup'>
            <span className='auth-form__text'>
              Нет аккаунта?
              <a href='' className='auth-form__link auth-form__link--signup' onClick={toggleForm}>
                Зарегистрируйтесь
              </a>
            </span>
          </div>
        </div>

        <div className='auth-form auth-form--signup'>
          <span className='auth-form__title'>Регистрация</span>
          <form action=''>
            <div className='auth-form__input-field'>
              <input
                type='text'
                className='auth-form__input'
                placeholder='Введите ваше имя'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-user'></i>
            </div>
			<div className='auth-form__input-field'>
              <input
                type='text'
                className='auth-form__input'
                placeholder='Введите вашу фамилию'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-user'></i>
            </div>
            <div className='auth-form__input-field'>
              <input
                type='text'
                className='auth-form__input'
                placeholder='Введите вашу почту'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-envelope'></i>
            </div>
            <div className='auth-form__input-field'>
              <input
                type='text'
                className='auth-form__input'
                placeholder='Введите ваш телефон'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-phone'></i>
            </div>
            <div className='auth-form__input-field'>
              <input
                type='password'
                className='auth-form__input password'
                placeholder='Создайте пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-lock'></i>
            </div>
			<div className='auth-form__input-field'>
              <input
                type='password'
                className='auth-form__input password'
                placeholder='Подтвердите пароль'
                value={passwordSecond}
                onChange={(e) => setPasswordSecond(e.target.value)}
                required
              />
              <i className='auth-form__icon uil uil-lock'></i>
            </div>
		
            <div className='auth-form__input-field auth-form__input-field--button'>
              <input
                type='button'
                className='auth-form__button'
                value='Зарегистрироваться'
                onClick={handelRegister}
              />
            </div>
            
          </form>
          <div className='auth-form__login-signup'>
            <span className='auth-form__text'>
              Есть аккаунт?
              <a href='' className='auth-form__link auth-form__link--login' onClick={toggleForm}>
                Авторизируйтесь
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
