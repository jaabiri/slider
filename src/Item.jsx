import React, { Fragment } from 'react';

const Item = ({src, description}) => {
  return (
    <Fragment>
      <div className="item">
        <div className="item__image">
          <img src={src} alt="" />
          <div class="item__body">
          <div class="item__title">
            Mon titre {description}
          </div>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Item;