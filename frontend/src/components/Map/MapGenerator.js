export const MapGenerator = ({Objects}) => {
	return (
        <svg
        className='Map'
        viewBox='0 0 1333.3333 1533.3333'
        xmlns='<http://www.w3.org/2000/svg>'>

        {Objects.map((item) =>
            <path
                className='AR'
                fill={item.fill}
                d={item.path}
                id={item.id}
                stroke='#54473F'
            />
        )
    
        }
        </svg>
	)
}
