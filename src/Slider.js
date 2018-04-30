import React, { Component } from 'react';
import Arrow from './Arrow';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const getBreakpointConfig = ({ config }) => {
	if (!config) return null;
	const breakpoint = Number(window.innerWidth);
	if (breakpoint >= 1690) return config[1690];
	if (breakpoint >= 1280 && breakpoint < 1690) return config[1280];
	if (breakpoint >= 980 && breakpoint < 1280) return config[980];
	if (breakpoint >= 736 && breakpoint < 980) return config[736];
	if (breakpoint <= 736) return config[480];
};

class Slider extends Component {
	constructor(props) {
		super(props);
		const effectiveConfig = (props.config && getBreakpointConfig(props)) || {
			slidesToScroll: props.slidesToScroll,
			slidesVisible: props.slidesVisible
		};
		this.state = {
			currentItem: 0,
			...effectiveConfig
		};
	}

	componentDidMount = () => {
		this.props.config && window.addEventListener('resize', this.resize);
	};

	componentWillUnmount = () => this.props.config && window.removeEventListener('resize', this.resize);

	resize = () => {
		const nextConfig = getBreakpointConfig(this.props);
		this.setState(nextConfig);
	};

	gotoItem = (index) => {
		const { children, loop } = this.props;
		const { currentItem, slidesVisible } = this.state;
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
		this.gotoItem(this.state.currentItem + this.state.slidesToScroll);
	};

	prev = () => {
		this.gotoItem(this.state.currentItem - this.state.slidesToScroll);
	};

	render() {
		const { children } = this.props;
		const { currentItem, slidesVisible, slidesToScroll } = this.state;

		const ratio = children.length / slidesVisible;
		const containerStyle = {
			width: `${ratio * 100}%`
		};
		const childrenStyle = {
			width: `${100 / slidesVisible / ratio}%`
		};

		const leftIemsCount = children.length - (this.state.currentItem + slidesVisible);
		console.log('leftIemsCount', leftIemsCount);

		return (
			<div className="carousel">
				<Arrow className="carousel__next" handleClick={this.next} disabled={leftIemsCount <= 0} />
				<Arrow className="carousel__prev" handleClick={this.prev} />
				<Pagination
					onMove={this.gotoItem}
					slidesToScroll={slidesToScroll}
					currentItem={currentItem}
					childrenLength={children.length}
					slidesToShow={slidesVisible}
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
	navigation: PropTypes.bool,
	config: PropTypes.object
};

export default Slider;
