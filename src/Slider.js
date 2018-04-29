import React, { Component } from 'react';
import Arrow from './Arrow';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

class Slider extends Component {
  state = {
    currentItem: 0
  };

  gotoItem = index => {
    const { children, slidesVisible, loop } = this.props;
    const { currentItem } = this.state;
    const childrenLength = children.length;
    if (index < 0) {
      if (loop) {
        index = childrenLength - slidesVisible;
      } else {
        return;
      }
    } else if (
      index >= childrenLength ||
      (children[currentItem + slidesVisible] === undefined &&
        index > currentItem)
    ) {
      if (loop) {
        index = 0;
      } else {
        return;
      }
    }
    let translateX = index * -100 / childrenLength;
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
    this.setState({
      currentItem: index
    });
  };

  next = () => {
    this.gotoItem(this.state.currentItem + this.props.slidesToScroll);
  };

  prev = () => {
    this.gotoItem(this.state.currentItem - this.props.slidesToScroll);
  };

  render() {
    const { children, slidesVisible } = this.props;
    const ratio = children.length / slidesVisible;
    const containerStyle = {
      width: `${ratio * 100}%`
    };
    const childrenStyle = {
      width: `${100 / slidesVisible / ratio}%`
    };
    return (
      <div className="carousel">
        <Arrow className="carousel__next" handleClick={this.next} />
        <Arrow className="carousel__prev" handleClick={this.prev} />
        <Pagination
          onMove={this.gotoItem}
          slidesToScroll={this.props.slidesToScroll}
           currentItem={this.state.currentItem}
           childrenLength={children.length}
             />
        <div
          className="carousel__container"
          style={containerStyle}
          ref={c => (this.container = c)}
        >
          {this.props.children.map((child, index) =>
            React.cloneElement(
              <div className="carousel__item" style={childrenStyle} key={index}>
                {child}
              </div>,
              {}
            )
          )}
        </div>
      </div>
    );
  }
}

Slider.defaultProps = {
  slidesToScroll: 3,
  slidesVisible: 2,
  loop: false,
  pagination: false,
  navigation: false
};

Slider.propTypes = {
  slidesToScroll: PropTypes.number,
  slidesVisible: PropTypes.number,
  loop: PropTypes.bool,
  pagination: PropTypes.bool,
  navigation: PropTypes.bool
};

export default Slider;
