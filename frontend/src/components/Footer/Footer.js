import './Footer.css'

export const Footer = () => {
	return (
		<footer className='footer'>
			<a className='header__logo' href='#'>
				<img className='header__logo-image' src='flower.svg' alt='Логотип сайта в виде цветка' />
			</a>
			<nav className='footer__nav'>
				<ul className='footer__nav-list'>
					<li className='header__nav-item'>
						<a className='header__nav-link'>О портале</a>
					</li>
					<li className='header__nav-item'>
						<a className='header__nav-link'>Карта</a>
					</li>
					<li className='header__nav-item'>
						<a className='header__nav-link'>Новости</a>
					</li>
					<li className='header__nav-item'>
						<a className='header__nav-link'>Посетителям</a>
					</li>
				</ul>
				<button className='header__nav-button'>
					<img className='header__nav-button-image' src='menu.svg' alt='Меню' />
				</button>
			</nav>
		</footer>
	)
}
