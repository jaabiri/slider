import React from 'react';

const Arrow = ({ className, handleClick, disabled }) => {
	return <button disabled={disabled} className={className} onClick={handleClick} />;
};

export default Arrow;
