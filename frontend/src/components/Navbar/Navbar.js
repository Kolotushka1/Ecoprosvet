import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
	return (
		<nav className='header__nav'>
			<Link className='header__logo' to='/'>
				<img className='header__logo-image' src='flower.svg' alt='Логотип сайта в виде цветка' />
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
					<Link to='/news' className='header__nav-link'>
						Новости
					</Link>
				</li>
				<li className='header__nav-item'>
					<Link to='/visitors' className='header__nav-link'>
						Посетителям
					</Link>
				</li>
				<button className='header__nav-button'>
					<img className='header__nav-button-image' src='menu.svg' alt='Меню' />
				</button>
			</ul>
		</nav>
	)
}
