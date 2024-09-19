import './Modal.css'

export const Modal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null // Если окно закрыто, ничего не рендерим

	return (
		<div className='modal'>
			<div className='modal__content'>
				<h2>Подтверждение записи</h2>
				<p>Действительно ли вы хотите записаться на мероприятие?</p>
				<button className='modal__confirm' onClick={onConfirm}>
					Да
				</button>
				<button className='modal__cancel' onClick={onClose}>
					Отмена
				</button>
			</div>
		</div>
	)
}
