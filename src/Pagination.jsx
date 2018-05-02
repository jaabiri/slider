import React from 'react';

const Pagination = ({ childrenLength, slidesToScroll, currentItem, slidesToShow, onMove }) => {
	const count = Math.ceil((childrenLength - slidesToShow) / slidesToScroll) + 1;
	const buttonPagination = Array.apply(null, Array(count + 1).join('0').split('')).map((_, i) => {
		const j = i ? i * slidesToScroll : i;
		const className =
			currentItem === j
				? 'carousel__pagination__button carousel__pagination__button--active'
				: 'carousel__pagination__button';
		return (
			<button
				className={className}
				onClick={() => {
					onMove(j);
				}}
				key={i}
			/>
		);
	});

	return <div className="carousel__pagination">{buttonPagination}</div>;
};

export default Pagination;
