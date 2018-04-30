import React, { Component } from 'react';
import Arrow from './Arrow';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const config = {
	'1024': {
		slidesToScroll: 1,
		slidesVisible: 4
	},
	'900': {
		slidesToScroll: 1,
		slidesVisible: 3
	},
	'600': {
		slidesToScroll: 1,
		slidesVisible: 2
	},
	'480': {
		slidesToScroll: 1,
		slidesVisible: 1
	}
};

const getBreakpointConfig = (breakpoint) => {
	if (breakpoint >= 1024) return config['1024'];
	if (breakpoint >= 900 && breakpoint < 1024) return config['900'];
	if (breakpoint >= 600 && breakpoint < 900) return config['600'];
	if (breakpoint <= 600) return config['480'];
};

class Slider extends Component {
	state = {
		currentItem: 0,
		slidesToScroll: 1,
		slidesVisible: 1
	};

	componentDidMount = () => {
		window.addEventListener('resize', this.resize);
		this.resize();
	};

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.resize);
	};

	resize = () => {
		const nextConfig = getBreakpointConfig(Number(window.innerWidth));
		this.setState(nextConfig);
	};

	gotoItem = (index) => {
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
			(children[currentItem + slidesVisible] === undefined && index > currentItem)
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
		const { children, slidesVisible, slidesToScroll, responsive } = this.props;

		const effectiveConfig = {
			slidesVisible: responsive ? this.state.slidesVisible : slidesVisible,
			slidesToScroll: responsive ? this.state.slidesToScroll : slidesToScroll
		};

		const ratio = children.length / effectiveConfig.slidesVisible;
		const containerStyle = {
			width: `${ratio * 100}%`
		};
		const childrenStyle = {
			width: `${100 / effectiveConfig.slidesVisible / ratio}%`
		};
		return (
			<div className="carousel">
				<Arrow className="carousel__next" handleClick={this.next} />
				<Arrow className="carousel__prev" handleClick={this.prev} />
				<Pagination
					onMove={this.gotoItem}
					slidesToScroll={effectiveConfig.slidesToScroll}
					currentItem={this.state.currentItem}
					childrenLength={children.length}
					slidesToShow={effectiveConfig.slidesVisible}
				/>
				<div className="carousel__container" style={containerStyle} ref={(c) => (this.container = c)}>
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
	slidesToScroll: 1,
	slidesVisible: 1,
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
