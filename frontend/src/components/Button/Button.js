export const Button = ({ text, onClick, type = 'button', disabled = false }) => {
	return (
		<button className={`button`} onClick={onClick} type={type} disabled={disabled}>
			{text}
		</button>
	)
}
