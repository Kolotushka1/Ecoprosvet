import React, { useRef, useState } from 'react'

export const MapGenerator = ({ Objects }) => {
	const [NumberOfEvents, setNumberOfEvents] = useState(null)
	const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
	const [rectSize, setRectSize] = useState({ width: 0, height: 0 })
	const textRef = useRef(null)

	// Находим максимальное значение NumOfEvents
	const maxNumOfEvents = Math.max(...Objects.map(obj => obj.NumOfEvents))

	// Функция для выбора цвета на основе процента
	const getFillColor = NumOfEvents => {
		const percentage = (NumOfEvents / maxNumOfEvents) * 100

		if (percentage < 33) {
			return '#C5C5C3' // Светло-зеленый (меньше 33%) (00b20033)
		} else if (percentage >= 33 && percentage <= 66) {
			return '#E2B689' // Средне-зеленый (от 33% до 66%) (00b20066)
		} else {
			return '#8E9E81' // Ярко-зеленый (больше 66%)
		}
	}

	const handleMouseEnter = (event, NumOfEvents) => {
		const path = event.target
		const bbox = path.getBBox() // Получаем размеры path
		const centerX = bbox.x + bbox.width / 2
		const centerY = bbox.y + bbox.height / 2

		setNumberOfEvents(NumOfEvents) // Сохраняем id для отображения
		setTextPosition({ x: centerX, y: centerY }) // Устанавливаем позицию текста

		// Рассчитываем размер прямоугольника на основе длины текста
		const textElement = textRef.current
		if (textElement) {
			const { width, height } = textElement.getBBox()
			setRectSize({ width: width + 10, height: height + 10 }) // Добавляем отступы
		}
	}

	const handleMouseLeave = () => {
		setNumberOfEvents(null) // Скрываем текст и прямоугольник при уходе с path
	}

	return (
		<svg className='map' viewBox='0 0 431 489' xmlns='http://www.w3.org/2000/svg'>
			{Objects.map(item => (
				<path
					className='region'
					fill={getFillColor(item.NumOfEvents)} // Используем функцию для получения цвета
					d={item.path}
					id={item.id}
					stroke='#54473F'
					onClick={() => (window.location.href = `/${item.id}`)}
					onMouseEnter={e => handleMouseEnter(e, item.NumOfEvents)} // Наведение мыши
					onMouseLeave={handleMouseLeave} // Уход мыши
				/>
			))}

			{/* Если есть NumberOfEvents, выводим прямоугольник и текст */}
			{NumberOfEvents && (
				<>
					<rect
						x={textPosition.x - rectSize.width / 2} // Центрируем прямоугольник
						y={textPosition.y - rectSize.height / 2} // Центрируем по вертикали
						width={rectSize.width}
						height={rectSize.height}
						fill='white' // Цвет фона прямоугольника
						stroke='black' // Обводка прямоугольника
						rx='5' // Закругленные углы
						ry='5'
						style={{ pointerEvents: 'none' }} // Отключаем взаимодействие с мышью
					/>
					<text
						ref={textRef} // Ссылка на текст для получения размеров
						x={textPosition.x}
						y={textPosition.y}
						textAnchor='middle' // Центрирование текста по горизонтали
						alignmentBaseline='middle' // Центрирование текста по вертикали
						fill='black' // Цвет текста
						fontSize='16' // Размер текста
						fontWeight='bold'
						style={{ pointerEvents: 'none' }} // Отключаем взаимодействие с мышью
					>
						{NumberOfEvents}
					</text>
				</>
			)}
		</svg>
	)
}
