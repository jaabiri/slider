import React, { Fragment } from 'react';

const Item = ({src, description}) => {
  return (
    <Fragment>
      <div className="item">
        <div className="item__image">
          <img src={src} alt="" />
        </div>
      </div>
    </Fragment>
  );
};

export default Item;