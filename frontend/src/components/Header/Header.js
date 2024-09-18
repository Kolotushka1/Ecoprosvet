import './Header.css'

export const Header = () => {
	return (
		<header className='header'>
			<a className='header__logo' href='#'>
				<img className='header__logo-image' src='flower.svg' alt='Логотип сайта в виде цветка' />
			</a>
			<nav className='header__nav'>
				<ul className='header__nav-list'>
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
		</header>
	)
}
