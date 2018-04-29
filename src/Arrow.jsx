import React from 'react';

const Arrow = ({className, handleClick}) => {
  return (
    <button className={className} onClick={handleClick} />
  );
};

export default Arrow;