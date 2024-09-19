import { Link } from 'react-router-dom'
import './Footer.css'

export const Footer = () => {
	return (
		<footer className='footer'>
			<address className='address footer__address'>
				<Link className='address-link' to='tel:+9999555555'>
					+9 999 555 5555
				</Link>{' '}
				{/* Закрыли тег */}
				<br />
				<Link className='address-link' to='mailto:info@sobaka.ge'>
					info@sobaka.ge
				</Link>
				<p className='address__city'>
					Новый Арбат ул.,
					<br />
					36, Москва
				</p>
			</address>
			<nav className='footer__menu'>
				<ul className='footer__menu-list'>
					<li className='footer__menu-list-item'>
						<Link className='footer__menu-link footer__menu-link_active' to='#'>
							главная
						</Link>
					</li>
					<li className='footer__menu-list-item'>
						<Link className='footer__menu-link' to='#'>
							посмотреть мероприятия
						</Link>
					</li>
					<li className='footer__menu-list-item'>
						<Link className='footer__menu-link' to='#'>
							о нас
						</Link>
					</li>
				</ul>
			</nav>
			<ul className='footer__social-list'>
				<li className='footer__social-list-item'>
					<Link className='footer__social-link' to='#'>
						<img className='footer__social-icon' src='/images/telegram.svg' alt='Иконка Ютуб' />
					</Link>
				</li>
				<li className='footer__social-list-item'>
					<Link className='footer__social-link' to='#'>
						<img className='footer__social-icon' src='/images/telegram.svg' alt='Иконка Вконтакте' />
					</Link>
				</li>
				<li className='footer__social-list-item'>
					<Link className='footer__social-link' to='#'>
						<img className='footer__social-icon' src='/images/telegram.svg' alt='Иконка Пинтерест' />
					</Link>
				</li>
			</ul>
		</footer>
	)
}
