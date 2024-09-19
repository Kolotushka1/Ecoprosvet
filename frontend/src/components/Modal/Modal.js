import './Modal.css'

export const Modal = ({ active, setActive }) => {
	return (
		<div className={active ? 'modal--active' : 'modal'} onClick={() => setActive(false)}>
			<div className='modal' onClick={e => e.stopPropagation()}></div>
		</div>
	)
}
