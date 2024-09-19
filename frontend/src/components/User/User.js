import React, { useState } from 'react'
import { Main } from '../Main/Main'
import './User.css'

export const User = () => {
	const [activeTab, setActiveTab] = useState('upcoming')

	const handleTabChange = tab => {
		setActiveTab(tab)
	}

	return (
		<Main>
			<section className='user-info'>
				<h1>Информация о пользователе</h1>
				<form>
					<label htmlFor='fio'>ФИО:</label>
					<input type='text' id='fio' name='fio' required />

					<label htmlFor='telegram'>Telegram:</label>
					<input type='text' id='telegram' name='telegram' disabled />

					<label htmlFor='phoneNumber'>Номер телефона:</label>
					<input type='tel' id='phoneNumber' name='phoneNumber' required />

					<label htmlFor='gender'>Пол:</label>
					<select id='gender' name='gender'>
						<option value='1'>Мужской</option>
						<option value='0'>Женский</option>
					</select>

					<label htmlFor='email'>Email:</label>
					<input type='email' id='email' name='email' required />

					<label htmlFor='birthDate'>Дата рождения:</label>
					<input type='date' id='birthDate' name='birthDate' required />

					<label htmlFor='district'>Район:</label>
					<select id='district' name='district'>
						<option value='1'>Центральный</option>
						<option value='0'>Ботанический</option>
					</select>

					<button type='submit'>Обновить</button>
				</form>
			</section>

			<section className='tabs'>
				<nav>
					<button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => handleTabChange('upcoming')}>
						Предстоящие мероприятия
					</button>
					<button className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`} onClick={() => handleTabChange('past')}>
						Прошедшие мероприятия
					</button>
				</nav>

				{activeTab === 'upcoming' && (
					<article>
						<h2>Предстоящие мероприятия</h2>
						<table>
							<thead>
								<tr>
									<th>Название</th>
									<th>Дата</th>
									<th>Место</th>
									<th>Район</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Мероприятие 1</td>
									<td>20 сентября 2024</td>
									<td>Москва</td>
									<td>Центральный</td>
								</tr>
								<tr>
									<td>Мероприятие 2</td>
									<td>25 сентября 2024</td>
									<td>Москва</td>
									<td>Ботанический</td>
								</tr>
							</tbody>
						</table>
					</article>
				)}

				{activeTab === 'past' && (
					<article>
						<h2>Прошедшие мероприятия</h2>
						<table>
							<thead>
								<tr>
									<th>Название</th>
									<th>Дата</th>
									<th>Место</th>
									<th>Район</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Мероприятие A</td>
									<td>10 июля 2024</td>
									<td>Москва</td>
									<td>Центральный</td>
								</tr>
								<tr>
									<td>Мероприятие B</td>
									<td>15 августа 2024</td>
									<td>Москва</td>
									<td>Ботанический</td>
								</tr>
							</tbody>
						</table>
					</article>
				)}
			</section>
		</Main>
	)
}
