import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
	const [isOpen, setOpen] = useState(false)

	const toggleMenu = () => {
		setOpen(!isOpen)
	}
	return (
		<nav className='header__nav'>
			<Link className='header__logo' to='/'>
				<img className='header__logo-image' src='/flower.svg' alt='Логотип сайта в виде цветка' />
			</Link>
			<ul className='header__nav-list'>
				<li className='header__nav-item'>
					<Link to='/about' className='header__nav-link'>
						О портале
					</Link>
				</li>
				<li className='header__nav-item'>
					<Link to='/map' className='header__nav-link'>
						Карта
					</Link>
				</li>
				<li className='header__nav-item'>
					<Link to='/events' className='header__nav-link'>
						Мероприятия
					</Link>
				</li>
				<li className='header__nav-item'>
					<Link to='/about' className='header__nav-link'>
						О нас
					</Link>
				</li>
			</ul>
			<button className='header__nav-button' onClick={toggleMenu}>
				<img className='header__nav-button-image' src={isOpen ? '/close.svg' : '/menu.svg'} alt={isOpen ? 'Закрыть меню' : 'Открыть меню'} />
			</button>
		</nav>
	)
}
