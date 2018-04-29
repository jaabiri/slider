import React from 'react';

const Pagination = ({
  childrenLength,
  slidesToScroll,
  currentItem,
  onMove
}) => {
  const buttonPagination = [];

  for (let i = 0; i < childrenLength; i = i + slidesToScroll) {
    const className =
         currentItem ===  i
        ? 'carousel__pagination__button carousel__pagination__button--active'
        : 'carousel__pagination__button';
    buttonPagination.push(
      <button className= {className} onClick={()=>{
        onMove(i)}}  key={i}/>
    );
  }
  return (
    <div className="carousel__pagination">
       {buttonPagination}
    </div>
  );
};

export default Pagination;
