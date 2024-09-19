import './Footer.css'

export const Footer = () => {
	return (
		<footer class='footer'>
			<address class='address footer__address'>
				<a class='address-link' href='tel:+9999555555'>
					+9 999 555 5555
				</a>
				<br />
				<a class='address-link' href='mailto:info@sobaka.ge'>
					info@sobaka.ge
				</a>
				<p class='address__city'>
					наб. Принсенграхт 263-
					<br />
					265, Москва
				</p>
			</address>
			<nav class='footer__menu'>
				<ul class='footer__menu-list'>
					<li class='footer__menu-list-item'>
						<a class='footer__menu-link footer__menu-link_active' href='#'>
							главная
						</a>
					</li>
					<li class='footer__menu-list-item'>
						<a class='footer__menu-link' href='#'>
							посмотреть мероприятия
						</a>
					</li>
					<li class='footer__menu-list-item'>
						<a class='footer__menu-link' href='#'>
							об аукционе
						</a>
					</li>
				</ul>
			</nav>
			<ul class='footer__social-list'>
				<li class='footer__social-list-item'>
					<a class='footer__social-link' href='#'>
						<img class='footer__social-icon' src='./images/yt.svg' alt='Иконка Ютуб' />
					</a>
				</li>
				<li class='footer__social-list-item'>
					<a class='footer__social-link' href='#'>
						<img class='footer__social-icon' src='./images/vk.svg' alt='Иконка Вконтакте' />
					</a>
				</li>
				<li class='footer__social-list-item'>
					<a class='footer__social-link' href='#'>
						<img class='footer__social-icon' src='./images/pinterest.svg' alt='Иконка Пинтерест' />
					</a>
				</li>
			</ul>
		</footer>
	)
}
